import { Component, Input } from '@angular/core';

export enum RoleType {
  Tank,
  Healer,
  MeleeDps,
  RangeDps,
  MagicDps
}

@Component({
  selector: 'syn-role-icon',
  templateUrl: './syn-role-icon.component.html',
  styleUrls: ['./syn-role-icon.component.less']
})
export class SynRoleIconComponent {

  constructor() { }

  @Input() isActive: boolean;
  @Input() roleType: RoleType;

  assetMap = {
    [RoleType.Tank]: 'role-icon-tank',
    [RoleType.Healer]: 'role-icon-healer',
    [RoleType.MeleeDps]: 'role-icon-melee-dps',
    [RoleType.RangeDps]: 'role-icon-physical-ranged-dps',
    [RoleType.MagicDps]: 'role-icon-magic-ranged-dps',
  };

  getClassName(): string {
    if (!this.isActive){
      return '';
    }
    return this.assetMap[this.roleType];
  }

}
