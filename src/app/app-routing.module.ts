import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupComposerComponent } from './group-composer/group-composer.component';

const routes: Routes = [
  { path: 'group-composer', component: GroupComposerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
