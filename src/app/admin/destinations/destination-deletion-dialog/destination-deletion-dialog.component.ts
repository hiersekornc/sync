import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DestinationDeletionDialogData {
  name: string;
}

@Component({
  selector: 'syn-destination-deletion-dialog',
  templateUrl: './destination-deletion-dialog.component.html',
  styleUrls: ['./destination-deletion-dialog.component.less']
})
export class DestinationDeletionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DestinationDeletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DestinationDeletionDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
