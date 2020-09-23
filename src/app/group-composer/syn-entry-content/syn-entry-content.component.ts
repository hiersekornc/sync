import { Component, Input, OnInit } from '@angular/core';
import { RoleIconSize, RoleType } from '../../syn-icon-tank/syn-role-icon.component';
import { Participant } from '../group-composer.component';

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
