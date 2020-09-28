import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDeletionDialogComponent } from './time-deletion-dialog.component';

describe('TimeDeletionDialogComponent', () => {
  let component: TimeDeletionDialogComponent;
  let fixture: ComponentFixture<TimeDeletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeDeletionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
