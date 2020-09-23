import { Component, Input, OnInit } from '@angular/core';
import { Participant } from '../group-composer/group-composer.component';

export enum RoleType {
  Tank,
  Healer,
  MeleeDps,
  RangeDps,
  MagicDps
}

export enum RoleIconSize {
  Small,
  Normal,
  Big
}

@Component({
  selector: 'syn-role-icon',
  templateUrl: './syn-role-icon.component.html',
  styleUrls: ['./syn-role-icon.component.less']
})
export class SynRoleIconComponent implements OnInit {

  constructor() { }

  @Input() item: Participant;
  @Input() roleType: RoleType;
  @Input() iconSize: RoleIconSize;
  isActiveFn: (item: Participant) => boolean;

  assetMap: { [key in RoleType]: string } = {
    [RoleType.Tank]: 'role-icon-tank',
    [RoleType.Healer]: 'role-icon-healer',
    [RoleType.MeleeDps]: 'role-icon-melee-dps',
    [RoleType.RangeDps]: 'role-icon-physical-ranged-dps',
    [RoleType.MagicDps]: 'role-icon-magic-ranged-dps',
  };
  selectorMap: { [key in RoleType]: (item: Participant) => boolean } = {
    [RoleType.Tank]: (item) => item.isTank,
    [RoleType.Healer]: (item) => item.isHealer,
    [RoleType.MeleeDps]: (item) => item.isMeleeDps,
    [RoleType.RangeDps]: (item) => item.isRangeDps,
    [RoleType.MagicDps]: (item) => item.isMagicDps,
  };
  setterMap: { [key in RoleType]: (item: Participant, value: boolean) => void } = {
    [RoleType.Tank]: (item, value) => item.isTank = value,
    [RoleType.Healer]: (item, value) => item.isHealer = value,
    [RoleType.MeleeDps]: (item, value) => item.isMeleeDps = value,
    [RoleType.RangeDps]: (item, value) => item.isRangeDps = value,
    [RoleType.MagicDps]: (item, value) => item.isMagicDps = value,
  };

  sizeMap: { [key in RoleIconSize]: string } = {
    [RoleIconSize.Small]: 'small',
    [RoleIconSize.Normal]: 'normal',
    [RoleIconSize.Big]: 'big'
  };

  ngOnInit(): void {
    this.isActiveFn = this.selectorMap[this.roleType];
  }

  getClassName(): string[] {
    const classNames = [];
    classNames.push(this.sizeMap[this.iconSize]);
    classNames.push(this.assetMap[this.roleType]);

    if (!this.isActiveFn(this.item)) {
      classNames.push('inactive');
    }
    return classNames;
  }

  toggleRole(): void {
    this.setterMap[this.roleType](this.item, !this.isActiveFn(this.item));

  }
}
