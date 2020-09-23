import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { GroupComposerComponent } from './group-composer/group-composer.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { SynRoleIconComponent } from './syn-icon-tank/syn-role-icon.component';
import { SynCourseDestinationComponent } from './group-composer/syn-course-destination/syn-course-destination.component';
import { SynEntryContentComponent } from './group-composer/syn-entry-content/syn-entry-content.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupComposerComponent,
    SearchFilterPipe,
    SynRoleIconComponent,
    SynCourseDestinationComponent,
    SynEntryContentComponent
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
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
