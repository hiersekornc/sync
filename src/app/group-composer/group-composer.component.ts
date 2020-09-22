import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RoleType } from '../syn-icon-tank/syn-role-icon.component';

type Applicant = {
  id: number;
  name: string;
  isTank: boolean;
  isHealer: boolean;
  isMeleeDps: boolean;
  isRangeDps: boolean;
  isMagicDps: boolean;
};

@Component({
  selector: 'app-group-composer',
  templateUrl: './group-composer.component.html',
  styleUrls: ['./group-composer.component.less']
})
export class GroupComposerComponent implements OnInit {

  constructor() { }
  query: string;
  RoleType = RoleType;
  roster: Applicant[] = [
    { id: 1, name: 'Dank Warrior', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 2, name: 'Pick up Black Mage', isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true },
    { id: 3, name: 'Homey Gunslinger', isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false },
    { id: 4, name: 'Sleepy Scholar', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 5, name: 'Get-Up Dark Knight', isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: false, isMagicDps: false },
    { id: 6, name: 'Bard Tooth', isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: true },
    { id: 7, name: 'Showering Ninja', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true },
    { id: 8, name: 'Mail-In Red Mage', isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: true},
    { id: 9, name: 'Huge Lalafell', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 10, name: 'Surging Summoner', isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: false },
    { id: 11, name: 'Marmelade Monk', isTank: false, isHealer: true, isMeleeDps: false, isRangeDps: false, isMagicDps: true },
    { id: 12, name: 'Pondering Paladin', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 13, name: 'Casual Rainbow', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: false },
    { id: 14, name: 'Silent Cookie', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: true },
    { id: 15, name: 'Skip Cutscenes', isTank: false, isHealer: false, isMeleeDps: false, isRangeDps: true, isMagicDps: false },
    { id: 16, name: 'Massive Astrologian', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 17, name: 'Trick Dancer', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 18, name: 'Potato Dragoon', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: true, isMagicDps: true },
    { id: 19, name: 'Fashion Police', isTank: true, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false },
    { id: 20, name: 'Frozen Shadow', isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 21, name: 'Taylor Swiftcast', isTank: false, isHealer: false, isMeleeDps: true, isRangeDps: true, isMagicDps: true },
    { id: 22, name: 'Animation Lock', isTank: true, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 23, name: 'Distracted White Mage', isTank: false, isHealer: true, isMeleeDps: true, isRangeDps: false, isMagicDps: false },
    { id: 24, name: 'Honey Mustard', isTank: false, isHealer: true, isMeleeDps: false, isRangeDps: true, isMagicDps: false },
    { id: 25, name: 'Concerned Eorzian', isTank: true, isHealer: false, isMeleeDps: true, isRangeDps: false, isMagicDps: true },
  ] ;
  setup: Applicant[][] = Array.from(Array(8), () => new Array(0));

  ngOnInit(): void {
  }

  dropOrSwap(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
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
                      0 );
    }
  }
  drop(event: CdkDragDrop<string[]>): void {

      transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex );
    }
  }
