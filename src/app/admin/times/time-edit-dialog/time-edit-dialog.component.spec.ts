import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEditDialogComponent } from './time-edit-dialog.component';

describe('TimeDialogComponent', () => {
  let component: TimeEditDialogComponent;
  let fixture: ComponentFixture<TimeEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
