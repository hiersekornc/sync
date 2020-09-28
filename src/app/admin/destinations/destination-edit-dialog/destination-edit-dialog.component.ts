import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DestinationEditDialogData {
  name: string;
}

@Component({
  selector: 'syn-destination-edit-dialog',
  templateUrl: './destination-edit-dialog.component.html',
  styleUrls: ['./destination-edit-dialog.component.less']
})
export class DestinationEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DestinationEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DestinationEditDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
