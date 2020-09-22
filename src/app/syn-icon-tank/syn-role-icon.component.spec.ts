import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynRoleIconComponent } from './syn-role-icon.component';

describe('SynIconTankComponent', () => {
  let component: SynRoleIconComponent;
  let fixture: ComponentFixture<SynRoleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynRoleIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynRoleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
