import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

type DestinationGroup = {
  id: number,
  name: string,
  children: Destination[]
};

type Destination = {
  id: number,
  name: string,
};

@Component({
  selector: 'syn-course-destination',
  templateUrl: './syn-course-destination.component.html',
  styleUrls: ['./syn-course-destination.component.less']
})
export class SynCourseDestinationComponent implements OnInit {

  constructor() { }

  filteredOptions: Observable<DestinationGroup[]>;
  destinationControl = new FormControl();
  timeControl = new FormControl();
  groupedDestinations: DestinationGroup[] = [
    { id: 0, name: 'ARR Trials', children: [
      { id: 0, name: 'Cape Westwind' },
      { id: 1, name: 'The Crysalis' },
      { id: 2, name: 'The Steps of Faith' },
      { id: 3, name: 'A Relic Reborn: The Chimera' },
      { id: 4, name: 'A Relic Reborn: The Hydra' },
      { id: 5, name: 'Battle on the Big Bridge' },
      { id: 6, name: 'The Dragon\'s Neck' },
      { id: 7, name: 'Battle in the Big Keep' },
      { id: 8, name: 'The Bowl of Embers (Hard)' },
      { id: 9, name: 'The Howling Eye (Hard)' },
      { id: 10, name: 'The Navel (Hard)' },
      { id: 11, name: 'Thornmarch (Hard)' },
      { id: 12, name: 'The Whorleater (Hard)' },
      { id: 13, name: 'The Striking Tree (Hard)' },
      { id: 14, name: 'Akh Afah Amphitheatre (Hard)' },
      { id: 15, name: 'Urth\'s Fount' },
    ] },
    { id: 1, name: 'ARR High-end Trials', children: [
      { id: 16, name: 'The Minstrel\'s Ballad: Ultima\'s Bane' },
      { id: 17, name: 'The Howling Eye (Extreme)' },
      { id: 18, name: 'The Navel (Extreme)' },
      { id: 19, name: 'The Bowl of Embers (Extreme)' },
      { id: 20, name: 'Thornmarch (Extreme)' },
      { id: 21, name: 'The Whorleater (Extreme)' },
      { id: 22, name: 'The Striking Tree (Extreme)' },
      { id: 23, name: 'Akh Afah Amphitheatre (Extreme)' },
    ] }
  ];
  timeSuggestions = [
    { id: 0, value: '19:00 - 21:00' },
    { id: 1, value: '21:00 - 23:00' },
    { id: 2, value: '19:00 - 22:00' },
    { id: 3, value: '20:00 - 23:00' },
  ];
  ngOnInit(): void {
    this.filteredOptions = this.destinationControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): DestinationGroup[] {
    const filterValue = value.toLowerCase();

    return this.groupedDestinations.map( group => {
      const filteredChildren = group.children.filter(option => option.name.toLowerCase().includes(filterValue));
      if ( filteredChildren.length > 0 ) {
        return { ...group, children: filteredChildren };
      }
      return null;
    } ).filter( group => group !== null );
  }

  clearSelection($event: MouseEvent, control: FormControl, trigger: HTMLElement): void {
    $event.stopPropagation();
    control.setValue('');
    trigger.focus();
  }
}
