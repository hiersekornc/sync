import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { flatMap, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { DataRetrievalService, ExternCourse, ExternGroup, ExternSignup, ExternStudent, ExternTimeSlot, FullExternCourse, SignUpState } from './data-retrieval.service';

export type Participant = {
  slot: ParticipantSlot[];
};
export type RosterEntry = {
  setups: boolean[];
  student: Student;
};
export type Student = {
  id: number;
  ingameName: string;
};
export type ParticipantSlot = {
  student: Student;

  isTank: boolean;
  isHealer: boolean;
  isMeleeDps: boolean;
  isRangeDps: boolean;
  isMagicDps: boolean;
  isSignup: boolean;
  isBackup: boolean;
};
export type Group = {
  name: string;
  participants: Participant[]
};
export type Setup = {
  destination: string;
  time: string;
  groups: Group[]
};

export type Course = {
  roster: RosterEntry[],
  setups: Setup[]
};

function by<T>(selector: (x: T) => string): (a: T, b: T) => number {
  return (a, b) => selector(a).localeCompare(selector(b));
}
function remove<T>(arr: T[], obj: T): void {
  const index = arr.indexOf(obj);

  if (index > -1) {
    arr.splice(index, 1);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SetupMutationService {
  createCourseFromExtern(externCourse: FullExternCourse): Observable<Course> {
    return this.createRoster()
      .pipe(
        map((roster) => ({ setups: externCourse.timeSlots.map(s => this.createSetupFromExtern(s, roster)), roster}))
    );
  }
  private createSetupFromExtern({ time, destination, groups }: ExternTimeSlot, roster: RosterEntry[]): Setup {
    const exGroups = groups.map(g => this.createGroupFromExtern(g, roster));
    return { time, destination, groups: exGroups };
  }
  createGroupFromExtern(exGroup: ExternGroup, roster: RosterEntry[]): Group {
    const group = this.createGroup(exGroup.name);
    const participants = exGroup.signUps.map(s => this.createParticipantFromExtern(s, roster));
    for (let index = 0; index < participants.length; index++) {
      const element = participants[index];
      group.participants[index].slot[0] = element;
    }
    return group;
  }
  // tslint:disable: no-bitwise
  createParticipantFromExtern(signup: ExternSignup, roster: RosterEntry[]): ParticipantSlot {
    return {
      student: this.resolveStudentFromExtern(signup.student, roster),
      isHealer: (signup.state & SignUpState.Healer) === SignUpState.Healer,
      isTank: (signup.state & SignUpState.Tank) === SignUpState.Tank,
      isMagicDps: (signup.state & SignUpState.Caster) === SignUpState.Caster,
      isMeleeDps: (signup.state & SignUpState.Melee) === SignUpState.Melee,
      isRangeDps: (signup.state & SignUpState.Ranged) === SignUpState.Ranged,
      isBackup: (signup.state & SignUpState.Backup) === SignUpState.Backup,
      isSignup: false // todo,
    };
  }
  // tslint:enable: no-bitwise
  resolveStudentFromExtern(student: ExternStudent, roster: RosterEntry[]): Student {
    const st = roster.map(r => r.student).find(s => s.id === student.id);
    return st || { id: -1, ingameName: 'Unknown' };
  }

  removeSetup(course: Course, setup: Setup): void {
    remove(course.setups, setup);
  }
  removeParticipantFromSetup(setup: Setup, student: Student): void {
    const allSlots = setup.groups.flatMap(g => g.participants).map(p => p.slot);
    for (const slot of allSlots) {
      if (slot[0]?.student === student) {
        slot.length = 0;
      }
    }
  }
  groupSizeChange(group: Group): void {
    if (group.participants.length === 8) {
      this.compactParticipants(group.participants, 4);
      group.participants.length = 4;
    } else {
      group.participants.push(...this.createParticipants(4));
    }
  }

  compactParticipants(arr: Participant[], size: number): void {
    size = arr.length > size ? size : arr.length;
    const existingParticipants = arr.map(s => s.slot[0]).filter(s => s);
    for (let index = 0; index < size; index++) {
      const element = existingParticipants[index];
      if (element) {
        arr[index].slot[0] = element;
      } else {
        arr[index].slot.length = 0;
      }
    }
  }
  updateMarks(course: Course): void {
    for (const entry of course.roster) {
      entry.setups.length = 0;
    }
    let setupNumber = 0;
    for (const setup of course.setups) {
      setupNumber++;
      const students = setup.groups.flatMap(g => g.participants).map(s => s.slot[0]).filter(p => p).map(p => p.student);

      for (const entry of course.roster) {
        entry.setups.push(students.includes(entry.student));
      }
    }
  }

  constructor(private dataRetrievalService: DataRetrievalService) { }

  createCourseAsync(): Observable<Course> {
    return this.createRoster()
      .pipe(
        map(roster => this.createCourse(roster))
      );
  }
  private createRoster(): Observable<RosterEntry[]> {
    return this.dataRetrievalService.getRoster().pipe(
      map(students => students.sort(by(x => x.ingameName))),
      map(students => students.map(this.createRosterEntry))
    );
  }

  private createCourse(roster: RosterEntry[]): Course {
    return {
      roster,
      setups: [this.createSetup()]
    };
  }

  private createRosterEntry(student: Student): RosterEntry {
    return {
      student,
      setups: []
    };
  }

  addSetup(course: Course): void {
    course.setups.push(this.createSetup());
  }

  addGroup(setup: Setup): void {
    const name = `Group ${setup.groups.length + 1}`;
    setup.groups.push(this.createGroup(name));
  }

  removeGroup(setup: Setup, group: Group): void {
    remove(setup.groups, group);

    if (setup.groups.length === 0) {
      this.addGroup(setup);
    }
  }

  private createSetup(): Setup {
    return {
      destination: '',
      time: '',
      groups: [this.createGroup('Group 1')]
    };
  }
  private createGroup(name: string): Group {
    return {
      name,
      participants: this.createParticipants(8)
    };
  }
  private createParticipants(count: number): Participant[] {
    return Array.from(Array(count), () => this.createParticipant());
  }

  private createParticipant(): Participant {
    return {
      slot: []
    };
  }
}
