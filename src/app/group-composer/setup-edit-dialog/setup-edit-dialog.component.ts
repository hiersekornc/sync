import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataRetrievalService, DestinationGroup, Time } from '../../shared/data-retrieval.service';


export interface SetupEditDialogData {
  destination: string;
  time: string;
}

@Component({
  selector: 'syn-setup-edit-dialog',
  templateUrl: './setup-edit-dialog.component.html',
  styleUrls: ['./setup-edit-dialog.component.less']
})
export class SetupEditDialogComponent implements OnInit {

  filteredOptions: Observable<DestinationGroup[]>;
  destinationControl: FormControl;
  timeControl: FormControl;
  timeSuggestions: Observable<Time[]>;

  constructor(
    private drs: DataRetrievalService,
    public dialogRef: MatDialogRef<SetupEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetupEditDialogData) {
    this.destinationControl = new FormControl(data.destination);
    this.timeControl = new FormControl(data.time);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const allDestinationsObservable = this.drs.getAutocompleteDestinations();
    const inputObs = this.destinationControl.valueChanges.pipe(startWith(''));
    this.filteredOptions = combineLatest([inputObs, allDestinationsObservable])
      .pipe(
        map((v1) => this._filter(v1))
      );
    this.timeSuggestions = this.drs.getAutocompleteTimes();
  }

  private _filter([v1, v2]: [string, DestinationGroup[]]): DestinationGroup[] {
    const filterValue = v1.toLowerCase();

    return v2.map(group => {
      const filteredEntries = group.entries.filter(option => option.name.toLowerCase().includes(filterValue));
      if (filteredEntries.length > 0) {
        return { ...group, entries: filteredEntries };
      }
      return null;
    }).filter(group => group !== null);
  }

  clearSelection($event: MouseEvent, control: FormControl, trigger: HTMLElement): void {
    $event.stopPropagation();
    control.setValue('');
    trigger.focus();
  }
}
