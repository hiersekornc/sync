import { Component, Input, OnInit } from '@angular/core';

export enum RoleType {
  Tank,
  Healer,
  MeleeDps,
  RangeDps,
  MagicDps
}

@Component({
  selector: 'app-syn-role-icon',
  templateUrl: './syn-role-icon.component.html',
  styleUrls: ['./syn-role-icon.component.less']
})
export class SynRoleIconComponent {

  constructor() { }

  @Input() isActive: boolean;
  @Input() roleType: RoleType;

  assetMap = {
    [RoleType.Tank]: 'assets/Icon_Tank.png',
    [RoleType.Healer]: 'assets/Icon_Healer.png',
    [RoleType.MeleeDps]: 'assets/Icon_Melee_DPS.png',
    [RoleType.RangeDps]: 'assets/Icon_Physical_Ranged_DPS.png',
    [RoleType.MagicDps]: 'assets/Icon_Magic_Ranged_DPS.png',
  };

  getImgSrc(): string {
    return this.assetMap[this.roleType];
  }

}
