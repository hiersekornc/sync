import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataRetrievalService, Destination, DestinationGroup } from '../../shared/data-retrieval.service';
import { DestinationCreationDialogComponent } from './destination-creation-dialog/destination-creation-dialog.component';
import { DestinationDeletionDialogComponent } from './destination-deletion-dialog/destination-deletion-dialog.component';
import { DestinationEditDialogComponent } from './destination-edit-dialog/destination-edit-dialog.component';

@Component({
  selector: 'syn-admin-destinations',
  templateUrl: './admin-destinations.component.html',
  styleUrls: ['./admin-destinations.component.less']
})
export class AdminDestinationsComponent implements OnInit {

  destinationGroups: DestinationGroup[];
  working: boolean;

  constructor(private drs: DataRetrievalService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.drs.getAutocompleteDestinations().subscribe(destinations => this.destinationGroups = destinations);
  }
  editEntry(destinationGroup: DestinationGroup): void {
    const dialogRef = this.dialog.open(DestinationEditDialogComponent, {
      width: '250px',
      data: { name: destinationGroup.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }
      destinationGroup.name = result;

      this.working = true;
      this.drs.putAutocompleteDestinationGroup(destinationGroup).subscribe(saved => this.working = false);
    });

  }
  deleteEntry(destinationGroup: DestinationGroup): void {
    const dialogRef = this.dialog.open(DestinationDeletionDialogComponent, {
      width: '250px',
      data: { name: destinationGroup.name },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== true) {
        return;
      }
      const index = this.destinationGroups.indexOf(destinationGroup);
      if (index < 0) {
        return;
      }
      this.destinationGroups.splice( index, 1 );

      this.working = true;
      this.drs.deleteAutocompleteDestinationGroup(destinationGroup).subscribe(saved => this.working = false);
    });
  }
  addEntry(): void {
    const dialogRef = this.dialog.open(DestinationCreationDialogComponent, {
      width: '250px',
      data: { name: '' },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined) {
        return;
      }

      this.destinationGroups.push( result );

      this.working = true;
      this.drs.createAutocompleteTime(result).subscribe(saved => {
        Object.assign(result, saved);
        this.working = false;
      });
    });
  }
}
