import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../../shared/setup-mutation.service';
import { RoleIconSize, RoleType } from '../../syn-role-icon/syn-role-icon.component';

@Component({
  selector: 'syn-entry-content',
  templateUrl: './syn-entry-content.component.html',
  styleUrls: ['./syn-entry-content.component.less']
})
export class SynEntryContentComponent {

  constructor() { }

  RoleType = RoleType;
  @Input() item: Participant;
  @Input() iconSize: RoleIconSize;
}
