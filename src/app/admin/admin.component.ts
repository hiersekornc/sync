import { Component, OnInit } from '@angular/core';
import { CurrentNode, NavigationNode } from './navigation/navigation.model';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'syn-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {

  currentNode: CurrentNode = { url: '', nodes: [] };
  dockSideNav = false;
  sideNavNodes: NavigationNode[];
  
  constructor(
    private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.navigationService.currentNodes.subscribe(currentNode => {
      this.currentNode = currentNode;
    });
    
    this.navigationService.navigationViews.subscribe(views => {
      this.sideNavNodes = views || [];
    });
  }

}
