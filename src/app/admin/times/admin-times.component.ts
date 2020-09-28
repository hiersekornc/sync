import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataRetrievalService, Time } from '../../shared/data-retrieval.service';
import { TimeCreationDialogComponent } from './time-creation-dialog/time-creation-dialog.component';
import { TimeDeletionDialogComponent } from './time-deletion-dialog/time-deletion-dialog.component';
import { TimeEditDialogComponent } from './time-edit-dialog/time-edit-dialog.component';

@Component({
  selector: 'syn-edit-times',
  templateUrl: './admin-times.component.html',
  styleUrls: ['./admin-times.component.less']
})
export class AdminTimesComponent implements OnInit {
  times: Time[] = [];
  working: boolean;

  constructor(private drs: DataRetrievalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.drs.getAutocompleteTimes().subscribe(times => this.times = times);
  }
  editEntry(time: Time): void {
    const dialogRef = this.dialog.open(TimeEditDialogComponent, {
      width: '250px',
      data: { text: time.text },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      time.text = result;

      this.working = true;
      this.drs.putAutocompleteTime(time).subscribe(saved => this.working = false);
    });

  }
  deleteEntry(time: Time): void {
    const dialogRef = this.dialog.open(TimeDeletionDialogComponent, {
      width: '250px',
      data: { text: time.text },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== true) {
        return;
      }
      const index = this.times.indexOf(time);
      if (index < 0) {
        return;
      }
      this.times.splice( index, 1 );

      this.working = true;
      this.drs.deleteAutocompleteTime(time).subscribe(saved => this.working = false);
    });
  }
  addEntry(): void {
    const dialogRef = this.dialog.open(TimeCreationDialogComponent, {
      width: '250px',
      data: { text: '' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      this.times.push( result );

      this.working = true;
      this.drs.createAutocompleteTime(result).subscribe(saved => {
        Object.assign(result, saved);
        this.working = false;
      });
    });
  }
}
