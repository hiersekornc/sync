import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { RoleIconSize } from '../syn-role-icon/syn-role-icon.component';
import { Course, Group, Participant, RosterEntry, Setup } from '../shared/setup-mutation.service';
import { SetupMutationService } from '../shared/setup-mutation.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupEditDialogComponent } from './group-edit-dialog/group-edit-dialog.component';
import { SetupEditDialogComponent } from './setup-edit-dialog/setup-edit-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, tap } from 'rxjs/operators';
import { DataRetrievalService } from '../shared/data-retrieval.service';
import { Observable } from 'rxjs';
enum DragSource {
  Roster,
  Workspace
}
interface SynDropListData {
  type: DragSource;
  entries: Participant[];
  setup: Setup;
}

@Component({
  selector: 'syn-group-composer',
  templateUrl: './group-composer.component.html',
  styleUrls: ['./group-composer.component.less']
})
export class GroupComposerComponent implements OnInit {

  constructor(
    private drs: DataRetrievalService,
    private setupMutationService: SetupMutationService,
    public dialog: MatDialog,
    private route: ActivatedRoute) { }
  query: string;
  course: Course;
  RoleIconSize = RoleIconSize;
  DragSource = DragSource;

  ngOnInit(): void {
    this.route.params
    .pipe(
      map(params => +params['id']),
      concatMap(id => this.getOrCreate(id) ),
      tap( course => this.setupMutationService.updateMarks(course))
    )
    .subscribe(course => this.course = course);
  }
  getOrCreate(id: number): Observable<Course> {
    if (id) {
      return this.drs.getCourse(id)
      .pipe(
        concatMap(  course => this.setupMutationService.createCourseFromExtern(course)))
    }
    return this.setupMutationService.createCourseAsync();
  }

  drop(event: CdkDragDrop<SynDropListData>): void {
    this.mutateLists(event);
    this.updateMarks();
  }
  mutateLists(event: CdkDragDrop<SynDropListData>): void {
    if (event.previousContainer === event.container) {
      // drag and drop occured on the same container: do nothing
      return;
    }
    const previousParticipant = event.previousContainer.data.entries[event.previousIndex];
    if (event.previousContainer.data.type !== DragSource.Roster) {
      // drag did not start on roster: remove participant from source
      event.previousContainer.data.entries.length = 0;
    }
    if (event.container.data.type === DragSource.Roster) {
      // drop ended on roster: do nothing else
      return;
    }
    const participant = event.container.data.entries[0];
    if (event.previousContainer.data.setup !== event.container.data.setup) {
      // drop ended in a different setup: remove clones
      this.setupMutationService.removeParticipantFromSetup(event.container.data.setup, previousParticipant.student);
    }
    if (participant && event.previousContainer.data.type !== DragSource.Roster) {
      // drop did not start on roster: move old participant to drag start location, effectively swapping
      event.previousContainer.data.entries[0] = participant;
    }
    if (previousParticipant) {
      // set participant to drop end location
      event.container.data.entries[0] = previousParticipant;
    }
  }
  updateMarks(): void {
    this.setupMutationService.updateMarks(this.course);
  }
  groupSizeChange(group: Group): void {
    this.setupMutationService.groupSizeChange(group);
    this.updateMarks();
  }
  isRosterItemHidden(applicant: RosterEntry): boolean {
    const student = applicant.student;
    return !['ingameName'].some(key => student.hasOwnProperty(key) && new RegExp(this.query, 'gi').test(student[key]));
  }

  removeGroup(setup: Setup, group: Group): void {
    this.setupMutationService.removeGroup(setup, group);
    this.updateMarks();
  }

  addGroup(setup: Setup): void {
    this.setupMutationService.addGroup(setup);
  }
  addSetup(course: Course): void {
    this.setupMutationService.addSetup(course);
    this.updateMarks();
  }
  removeSetup(setup: Setup): void {
    this.setupMutationService.removeSetup(this.course, setup);
    this.updateMarks();
  }
  editGroupName(group: Group): void {
    const dialogRef = this.dialog.open(GroupEditDialogComponent, {
      width: '250px',
      data: { name: group.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      group.name = result;
    });
  }
  editSetup(setup: Setup): void {
    const dialogRef = this.dialog.open(SetupEditDialogComponent, {
      width: '400px',
      data: { destination: setup.destination, time: setup.time },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      setup.destination = result.destination;
      setup.time = result.time;
    });

  }
}
