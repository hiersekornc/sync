import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimesComponent } from './admin-times.component';

describe('EditTimesComponent', () => {
  let component: AdminTimesComponent;
  let fixture: ComponentFixture<AdminTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
