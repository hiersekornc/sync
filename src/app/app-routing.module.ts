import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDestinationsComponent } from './admin/destinations/admin-destinations.component';
import { AdminTimesComponent } from './admin/times/admin-times.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { GroupComposerComponent } from './group-composer/group-composer.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ChildViewComponent } from './child-view/child-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: ChildViewComponent, children: [
    { path: '', component: CourseListComponent },
    { path: ':id', component: GroupComposerComponent },
  ] },
  { path: 'group-composer', component: GroupComposerComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: OverviewComponent },
    { path: 'edit-destinations', component: AdminDestinationsComponent },
    { path: 'edit-times', component: AdminTimesComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
