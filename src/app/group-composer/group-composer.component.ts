import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { RoleIconSize } from '../syn-icon-tank/syn-role-icon.component';

type VirtualParticipant = {
  slot: Participant[];
};
export type Participant = {
  id: number;
  name: string;
  isTank: boolean;
  isHealer: boolean;
  isMeleeDps: boolean;
  isRangeDps: boolean;
  isMagicDps: boolean;
  isSignup: boolean;
};
type Group = {
  number: number;
  participants: VirtualParticipant[]
};
type Setup = {
  destination: string;
  time: string;
  groups: Group[]
};

@Component({
  selector: 'syn-group-composer',
  templateUrl: './group-composer.component.html',
  styleUrls: ['./group-composer.component.less']
})
export class GroupComposerComponent implements OnInit {

  constructor() { }
  query: string;
  roster: Participant[] = [
    {
      id: 1, name: 'Dank Warrior',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 2, name: 'Pick up Black Mage',
      isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true, isSignup: true
    },
    {
      id: 3, name: 'Homey Gunslinger',
      isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 4, name: 'Sleepy Scholar',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 5, name: 'Get-Up Dark Knight',
      isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: false, isMagicDps: false, isSignup: false
    },
    {
      id: 6, name: 'Bard Tooth',
      isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: true, isSignup: true
    },
    {
      id: 7, name: 'Showering Ninja',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true, isSignup: true
    },
    {
      id: 8, name: 'Mail-In Red Mage',
      isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: true, isSignup: true
    },
    {
      id: 9, name: 'Huge Lalafell',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 10, name: 'Surging Summoner',
      isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 11, name: 'Marmelade Monk',
      isTank: false, isHealer: true, isMeleeDps: false, isRangeDps: false, isMagicDps: true, isSignup: true
    },
    {
      id: 12, name: 'Pondering Paladin',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: false
    },
    {
      id: 13, name: 'Casual Rainbow',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 14, name: 'Silent Cookie',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: true, isSignup: true
    },
    {
      id: 15, name: 'Skip Cutscenes',
      isTank: false, isHealer: false, isMeleeDps: false, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 16, name: 'Massive Astrologian',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 17, name: 'Trick Dancer',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 18, name: 'Potato Dragoon',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: true, isMagicDps: true, isSignup: false
    },
    {
      id: 19, name: 'Fashion Police',
      isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 20, name: 'Frozen Shadow',
      isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 21, name: 'Taylor Swiftcast',
      isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: true, isSignup: true
    },
    {
      id: 22, name: 'Animation Lock',
      isTank: true, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 23, name: 'Distracted White Mage',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: false
    },
    {
      id: 24, name: 'Honey Mustard',
      isTank: false, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false, isSignup: true
    },
    {
      id: 25, name: 'Concerned Eorzian',
      isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true, isSignup: true
    },
    {
      id: 26, name: 'Pensive Shrimp',
      isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: true, isMagicDps: true, isSignup: true
    },
    {
      id: 27, name: 'Pretty Guardian',
      isTank: true, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false, isSignup: true
    },
    {
      id: 28, name: 'Squid Princess',
      isTank: false, isHealer: false, isMeleeDps: false, isRangeDps: true, isMagicDps: true, isSignup: true
    },
  ];
  setup: Setup;
  RoleIconSize = RoleIconSize;

  ngOnInit(): void {
    this.setup = {
      destination: '',
      time: '',
      groups: [this.createGroup()]
    };
  }

  private createGroup(): Group {
    return {
      number: 1,
      participants: Array.from(Array(8), () => this.createVirtualParticipant())
    };
  }
  private createVirtualParticipant(): VirtualParticipant {
    return {
      slot: []
    };
  }

  dropOrSwap(event: CdkDragDrop<Participant[]>): void {
    const isSwapRequired = event.container.data.length > 0;
    if (isSwapRequired) {
      transferArrayItem(event.container.data,
        event.previousContainer.data,
        0,
        event.previousIndex + 1);
    }
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      0);
  }

  isRosterItemHidden(applicant: Participant): boolean {
    return !['id', 'name'].some(key => applicant.hasOwnProperty(key) && new RegExp(this.query, 'gi').test(applicant[key]));
  }

  drop(event: CdkDragDrop<Participant[]>): void {

    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);
  }

  addGroup(): void {
    this.setup.groups.push(this.createGroup());
  }
}
