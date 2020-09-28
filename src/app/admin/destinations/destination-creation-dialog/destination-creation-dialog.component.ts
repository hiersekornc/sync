import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DestinationCreationDialogData {
  name: string;
}

@Component({
  selector: 'syn-destination-creation-dialog',
  templateUrl: './destination-creation-dialog.component.html',
  styleUrls: ['./destination-creation-dialog.component.less']
})
export class DestinationCreationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DestinationCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DestinationCreationDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
