import { Component, Input, OnInit } from '@angular/core';
import { Participant, RosterEntry } from '../../shared/setup-mutation.service';
import { RoleIconSize, RoleType } from '../../syn-role-icon/syn-role-icon.component';

@Component({
  selector: 'syn-roster-entry',
  templateUrl: './syn-roster-entry.component.html',
  styleUrls: ['./syn-roster-entry.component.less']
})
export class SynRosterEntryComponent {

  constructor() { }

  RoleType = RoleType;
  @Input() item: RosterEntry;
  @Input() iconSize: RoleIconSize;
}
