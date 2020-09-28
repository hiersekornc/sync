import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinationsComponent } from './admin-destinations.component';

describe('EditDestinationsComponent', () => {
  let component: AdminDestinationsComponent;
  let fixture: ComponentFixture<AdminDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDestinationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
