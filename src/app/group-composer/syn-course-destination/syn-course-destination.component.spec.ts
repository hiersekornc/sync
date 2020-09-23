import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynCourseDestinationComponent } from './syn-course-destination.component';

describe('SynCourseDestinationComponent', () => {
  let component: SynCourseDestinationComponent;
  let fixture: ComponentFixture<SynCourseDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynCourseDestinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynCourseDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
