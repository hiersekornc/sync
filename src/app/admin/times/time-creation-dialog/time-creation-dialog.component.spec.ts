import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeCreationDialogComponent } from './time-creation-dialog.component';

describe('TimeCreationDialogComponent', () => {
  let component: TimeCreationDialogComponent;
  let fixture: ComponentFixture<TimeCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
