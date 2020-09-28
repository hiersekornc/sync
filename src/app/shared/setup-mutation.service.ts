import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { flatMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { DataRetrievalService, ExternCourse, ExternGroup, ExternSignup, ExternStudent, ExternTimeSlot, FullExternCourse, SignUpState } from './data-retrieval.service';

export type Participant = {
  id?: number;
  student: Student;

  isTank: boolean;
  isHealer: boolean;
  isMeleeDps: boolean;
  isRangeDps: boolean;
  isMagicDps: boolean;
  isSignup: boolean;
  isBackup: boolean;
};
export type RosterEntry = {
  setups: boolean[];
  student: Student;
};
export type Student = {
  id: number;
  ingameName: string;
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

  constructor(private dataRetrievalService: DataRetrievalService) { }

  createCourseFromExtern({ timeSlots }: FullExternCourse): Observable<Course> {
    const setups = timeSlots.map(s => this.createSetupFromExtern(s));
    return this.createRoster()
      .pipe(
        map((roster) => ({ setups, roster }))
      );
  }

  private createSetupFromExtern({ time, destination, groups }: ExternTimeSlot): Setup {
    const exGroups = groups.map(g => this.createGroupFromExtern(g));
    return { time, destination, groups: exGroups };
  }

  createGroupFromExtern({ name, signUps }: ExternGroup): Group {
    const participants = signUps.map(s => this.createParticipantFromExtern(s));
    participants.length = 8;
    return {
      name,
      participants
    };
  }

  // tslint:disable: no-bitwise
  createParticipantFromExtern({ student, state, id }: ExternSignup): Participant {
    return {
      id,
      student: this.resolveStudentFromExtern(student),
      isHealer: (state & SignUpState.Healer) === SignUpState.Healer,
      isTank: (state & SignUpState.Tank) === SignUpState.Tank,
      isMagicDps: (state & SignUpState.Caster) === SignUpState.Caster,
      isMeleeDps: (state & SignUpState.Melee) === SignUpState.Melee,
      isRangeDps: (state & SignUpState.Ranged) === SignUpState.Ranged,
      isBackup: (state & SignUpState.Backup) === SignUpState.Backup,
      isSignup: false // todo,
    };
  }
  // tslint:enable: no-bitwise
  resolveStudentFromExtern({ id, ingameName }: ExternStudent): Student {
    return { id, ingameName };
  }

  removeSetup(course: Course, setup: Setup): void {
    remove(course.setups, setup);
  }
  removeParticipantFromSetup(setup: Setup, student: Student): void {
    for (const group of setup.groups) {
      for (let i = 0; i < group.participants.length; i++) {
        const participant = group.participants[i];
        if (participant?.student.id === student.id) {
          delete group.participants[i];
        }
      }
    }
  }
  groupSizeChange(group: Group): void {
    if (group.participants.length === 8) {
      this.compactParticipants(group.participants, 4);
      group.participants.length = 4;
    } else {
      group.participants.length = 8;
    }
  }

  compactParticipants(arr: Participant[], size: number): void {
    let i = 0;
    while (i < size && arr.length > size) {
      if (!arr[i]) {
        arr.splice(i, 1);
      } else {
        i++;
      }
    }
  }
  updateMarks(course: Course): void {
    for (const entry of course.roster) {
      entry.setups.length = 0;
    }
    course.setups.forEach((setup) => {
      const studentIds = setup.groups.flatMap(g => g.participants).map( p => p.student.id);

      for (const entry of course.roster) {
        entry.setups.push(studentIds.includes(entry.student.id));
      }
    });
  }


  createCourseAsync(): Observable<Course> {
    return this.createRoster()
      .pipe(
        map(roster => this.createCourse(roster))
      );
  }
  private createRoster(): Observable<RosterEntry[]> {
    return this.dataRetrievalService.getRoster().pipe(
      map(students => students.sort(by(x => x.ingameName))),
      map(students => students.map(s => this.createRosterEntry(s)))
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

  createParticipant(student: Student): Participant {
    return {
      student,
      isHealer: false,
      isTank: false,
      isMagicDps: false,
      isMeleeDps: false,
      isRangeDps: false,
      isBackup: false,
      isSignup: false // todo,
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
      participants: Array(8)
    };
  }
}
