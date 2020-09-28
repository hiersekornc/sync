import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface GroupEditDialogData {
  name: string;
}

@Component({
  selector: 'syn-group-edit-dialog',
  templateUrl: './group-edit-dialog.component.html',
  styleUrls: ['./group-edit-dialog.component.less']
})
export class GroupEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GroupEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupEditDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
