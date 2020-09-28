import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GroupComposerComponent } from './group-composer/group-composer.component';
import { GroupEditDialogComponent } from './group-composer/group-edit-dialog/group-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationService } from './admin/navigation/navigation.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { SynRoleIconComponent } from './syn-role-icon/syn-role-icon.component';
import { SetupEditDialogComponent } from './group-composer/setup-edit-dialog/setup-edit-dialog.component';
import { SynEntryContentComponent } from './group-composer/syn-entry-content/syn-entry-content.component';
import { SynRosterEntryComponent } from './group-composer/syn-roster-entry/syn-roster-entry.component';
import { AdminComponent } from './admin/admin.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { NavItemComponent } from './admin/nav-item/nav-item.component';
import { NavMenuComponent } from './admin/nav-menu/nav-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './admin/shared/location.service';
import { ScrollService } from './admin/shared/scroll.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminTimesComponent } from './admin/times/admin-times.component';
import { TimeEditDialogComponent } from './admin/times/time-edit-dialog/time-edit-dialog.component';
import { TimeDeletionDialogComponent } from './admin/times/time-deletion-dialog/time-deletion-dialog.component';
import { TimeCreationDialogComponent } from './admin/times/time-creation-dialog/time-creation-dialog.component';
import { AdminDestinationsComponent } from './admin/destinations/admin-destinations.component';
import { DestinationEditDialogComponent } from './admin/destinations/destination-edit-dialog/destination-edit-dialog.component';
import { DestinationDeletionDialogComponent } from './admin/destinations/destination-deletion-dialog/destination-deletion-dialog.component';
import { DestinationCreationDialogComponent } from './admin/destinations/destination-creation-dialog/destination-creation-dialog.component';
import { CourseListComponent } from './course-list/course-list.component';
import { ChildViewComponent } from './child-view/child-view.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComposerComponent,
    GroupEditDialogComponent,
    SynRoleIconComponent,
    SetupEditDialogComponent,
    SynEntryContentComponent,
    SynRosterEntryComponent,
    AdminComponent,
    AdminDestinationsComponent,
    OverviewComponent,
    NavItemComponent,
    NavMenuComponent,
    AdminTimesComponent,
    TimeEditDialogComponent,
    TimeDeletionDialogComponent,
    TimeCreationDialogComponent,
    DestinationEditDialogComponent,
    DestinationDeletionDialogComponent,
    DestinationCreationDialogComponent,
    CourseListComponent,
    ChildViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCardModule,
    MatBadgeModule,
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatSidenavModule,
    HttpClientModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule
  ],
  providers: [
    NavigationService,
    LocationService,
    ScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
