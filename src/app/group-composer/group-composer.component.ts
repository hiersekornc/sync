import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { RoleIconSize } from '../syn-role-icon/syn-role-icon.component';
import { Course, Group, Participant, RosterEntry, Setup, Student } from '../shared/setup-mutation.service';
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
interface DropListData {
  type: DragSource;
}
interface RosterDropListData extends DropListData {
  roster: RosterEntry[];
}
interface WorkspaceDropListData extends DropListData {
  group: Group;
  setup: Setup;
  index: number;
}

@Component({
  selector: 'syn-group-composer',
  templateUrl: './group-composer.component.html',
  styleUrls: ['./group-composer.component.less']
})
export class GroupComposerComponent implements OnInit {
  dropDataFactory: DropDataFactory;

  constructor(
    private drs: DataRetrievalService,
    private setupMutationService: SetupMutationService,
    public dialog: MatDialog,
    private route: ActivatedRoute) {
    this.dropDataFactory = new DropDataFactory(this.setupMutationService);
  }
  query: string;
  course: Course;
  RoleIconSize = RoleIconSize;
  DragSource = DragSource;

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => +params['id']),
        concatMap(id => this.getOrCreate(id)),
        tap(course => this.setupMutationService.updateMarks(course))
      )
      .subscribe(course => this.course = course);
  }
  getOrCreate(id: number): Observable<Course> {
    if (id) {
      return this.drs.getCourse(id)
        .pipe(
          concatMap(course => this.setupMutationService.createCourseFromExtern(course)))
    }
    return this.setupMutationService.createCourseAsync();
  }

  drop(event: CdkDragDrop<DropListData>): void {
    this.mutateLists(event);
    this.updateMarks();
  }

  mutateLists(event: CdkDragDrop<DropListData>): void {
    if (event.previousContainer === event.container) {
      // drag and drop occured on the same container: do nothing
      return;
    }
    const sourceData = this.dropDataFactory.CreateFromSource(event);
    const destData = this.dropDataFactory.CreateFromDestination(event);

    sourceData.removeParticipant();
    destData.removeDuplicates(sourceData.getParticipant());
    sourceData.setParticipant(destData.getParticipant());
    destData.setParticipant(sourceData.getParticipant());
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
interface DropData {
  getParticipant(): Participant;
  removeParticipant(): void;
  removeDuplicates(p: Participant): void;
  setParticipant(p: Participant): void;
}
class DropDataFactory {
  constructor(private sms: SetupMutationService) { }
  CreateFromDestination(event: CdkDragDrop<DropListData>): DropData {
    if (event.container.data.type === DragSource.Roster) {
      return this.CreateRosterDropData(true, event);
    } else {
      return this.CreateWorkspaceDropData(true, event);
    }
  }
  CreateFromSource(event: CdkDragDrop<DropListData>): DropData {
    if (event.previousContainer.data.type === DragSource.Roster) {
      return this.CreateRosterDropData(false, event);
    } else {
      return this.CreateWorkspaceDropData(false, event);
    }
  }
  CreateRosterDropData(isDestination: boolean, event: CdkDragDrop<DropListData>): RosterDropData {
    return new RosterDropData(isDestination, this.sms, event);
  }
  CreateWorkspaceDropData(isDestination: boolean, event: CdkDragDrop<DropListData>): WorkspaceDropData {
    return new WorkspaceDropData(isDestination, this.sms, event);
  }
}

class WorkspaceDropData implements DropData {
  participant: Participant;
  data: WorkspaceDropListData;
  constructor(
    isDestination: boolean,
    private setupMutationService: SetupMutationService,
    dragdrop: CdkDragDrop<DropListData>) {
    this.data = (isDestination ? dragdrop.container.data : dragdrop.previousContainer.data) as WorkspaceDropListData;
    this.participant = isDestination ? this.data.group.participants[this.data.index] : dragdrop.item.data;
  }

  getParticipant(): Participant {
    return this.participant;
  }
  removeParticipant(): void {
    delete this.data.group.participants[this.data.index];
  }
  removeDuplicates(p: Participant): void {
    this.setupMutationService.removeParticipantFromSetup(this.data.setup, p.student);
  }
  setParticipant(p: Participant): void {
    if (!p) { return; }
    this.data.group.participants[this.data.index] = p;
  }
}

class RosterDropData implements DropData {
  participant: Participant;

  constructor(
    isDestination: boolean,
    private setupMutationService: SetupMutationService,
    dragdrop: CdkDragDrop<DropListData>) {
    this.participant = isDestination ? null : this.setupMutationService.createParticipant(dragdrop.item.data);
  }

  getParticipant(): Participant {
    return this.participant;
  }
  removeParticipant(): void {
    /* does nothing */
  }
  removeDuplicates(p: Participant): void {
    /* does nothing */
  }
  setParticipant(p: Participant): void {
    /* does nothing */
  }
}