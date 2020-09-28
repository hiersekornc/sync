import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CreationDialogData {
  text: string;
}

@Component({
  selector: 'syn-time-creation-dialog',
  templateUrl: './time-creation-dialog.component.html',
  styleUrls: ['./time-creation-dialog.component.less']
})
export class TimeCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreationDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
