import { Injectable } from '@angular/core';

import { combineLatest, ConnectableObservable, Observable, of } from 'rxjs';
import { map, publishLast, publishReplay } from 'rxjs/operators';

import { LocationService } from '../shared/location.service';

// Import and re-export the Navigation model types
import { CurrentNode, NavigationNode } from './navigation.model';
export { CurrentNode, NavigationNode } from './navigation.model';

@Injectable()
export class NavigationService {

  /**
   * An observable collection of NavigationNode trees, which can be used to render navigational menus
   */
  navigationViews: Observable<NavigationNode[]>;

  /**
   * An observable of the current node with info about the
   * node (if any) that matches the current URL location
   * including its navigation view and its ancestor nodes in that view
   */
  currentNodes: Observable<CurrentNode>;
  staticViews: NavigationNode[];

  constructor(private location: LocationService) {
    this.staticViews = [
      {
        title: 'Autocomplete',
        tooltip: 'Edit predefined suggestions on common input fields',
        children: [
          {
            url: 'admin/edit-destinations',
            title: 'Destinations',
            tooltip: 'Predefined values for the destination of a course'
          },
          {
            url: 'admin/edit-times',
            title: 'Times',
            tooltip: 'Predefined values for the times of a course'
          }
        ]
      }
    ];
    const navigationInfo = this.fetchNavigationInfo();
    this.navigationViews = this.getNavigationViews(navigationInfo);

    this.currentNodes = this.getCurrentNodes(this.navigationViews);
  }

  /**
   * Get an observable that fetches the `NavigationResponse` from the server.
   * We create an observable by calling `http.get` but then publish it to share the result
   * among multiple subscribers, without triggering new requests.
   * We use `publishLast` because once the http request is complete the request observable completes.
   * If you use `publish` here then the completed request observable will cause the subscribed observables to complete too.
   * We `connect` to the published observable to trigger the request immediately.
   * We could use `.refCount` here but then if the subscribers went from 1 -> 0 -> 1 then you would get
   * another request to the server.
   * We are not storing the subscription from connecting as we do not expect this service to be destroyed.
   */
  private fetchNavigationInfo(): Observable<NavigationNode[]> {
    const navigationInfo = of(this.staticViews)
      .pipe(publishLast());
    (navigationInfo as ConnectableObservable<NavigationNode[]>).connect();
    return navigationInfo;
  }

  private getNavigationViews(navigationInfo: Observable<NavigationNode[]>): Observable<NavigationNode[]> {
    const navigationViews = navigationInfo.pipe(
      publishLast(),
    );
    (navigationViews as ConnectableObservable<NavigationNode[]>).connect();
    return navigationViews;
  }

  /**
   * Get an observable of the current nodes (the ones that match the current URL)
   * We use `publishReplay(1)` because otherwise subscribers will have to wait until the next
   * URL change before they receive an emission.
   * See above for discussion of using `connect`.
   */
  private getCurrentNodes(navigationViews: Observable<NavigationNode[]>): Observable<CurrentNode> {
    const currentNodes = combineLatest([
      navigationViews.pipe(
          map(views => this.computeUrlToNavNodesMap(views))),
      this.location.currentPath,
    ])
      .pipe(
        map((result) => ({navMap: result[0] , url: result[1]})),
        map((result) => {
        const matchSpecialUrls = /^api/.exec(result.url);
        if (matchSpecialUrls) {
            result.url = matchSpecialUrls[0];
        }
        return result.navMap.get(result.url) ||  { url: result.url, nodes: [] };
        }),
        publishReplay(1));
    (currentNodes as ConnectableObservable<CurrentNode>).connect();
    return currentNodes;
  }

  /**
   * Compute a mapping from URL to an array of nodes, where the first node in the array
   * is the one that matches the URL and the rest are the ancestors of that node.
   *
   * @param navigation - A collection of navigation nodes that are to be mapped
   */
  private computeUrlToNavNodesMap(navigation: NavigationNode[]) {
    const navMap = new Map<string, CurrentNode>();
    navigation.forEach(node => this.walkNodes( navMap, node));
    return navMap;
  }

  /**
   * Add tooltip to node if it doesn't have one and have title.
   * If don't want tooltip, specify `"tooltip": ""` in navigation.json
   */
  private ensureHasTooltip(node: NavigationNode) {
    const title = node.title;
    const tooltip = node.tooltip;
    if (tooltip == null && title ) {
      // add period if no trailing punctuation
      node.tooltip = title + (/[a-zA-Z0-9]$/.test(title) ? '.' : '');
    }
  }
  /**
   * Walk the nodes of a navigation tree-view,
   * patching them and computing their ancestor nodes
   */
  private walkNodes( navMap: Map<string, CurrentNode>,
    node: NavigationNode, ancestors: NavigationNode[] = []) {
      const nodes = [node, ...ancestors];
      const url = node.url;
      this.ensureHasTooltip(node);

      // only map to this node if it has a url
      if (url) {
        // Strip off trailing slashes from nodes in the navMap - they are not relevant to matching
        const cleanedUrl = url.replace(/\/$/, '');
        if (!navMap.has(cleanedUrl)) {
          navMap.set(cleanedUrl, { url: null, nodes: [] });
        }
        const navMapItem = navMap.get(cleanedUrl)!;
        navMapItem.url = url;
        navMapItem.nodes = nodes;
      }

      if (node.children) {
        node.children.forEach(child => this.walkNodes( navMap, child, nodes));
      }
    }
}