import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TimeEditDialogData {
  text: string;
}

@Component({
  selector: 'syn-time-dialog',
  templateUrl: './time-edit-dialog.component.html',
  styleUrls: ['./time-edit-dialog.component.less']
})
export class TimeEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimeEditDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
