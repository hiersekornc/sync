import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupEditDialogComponent } from './setup-edit-dialog.component';

describe('SynCourseDestinationComponent', () => {
  let component: SetupEditDialogComponent;
  let fixture: ComponentFixture<SetupEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
