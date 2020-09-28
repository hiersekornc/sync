import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeletionDialogData {
  text: string;
}

@Component({
  selector: 'syn-time-deletion-dialog',
  templateUrl: './time-deletion-dialog.component.html',
  styleUrls: ['./time-deletion-dialog.component.less']
})
export class TimeDeletionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TimeDeletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeletionDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
