import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationCreationDialogComponent } from './destination-creation-dialog.component';

describe('DestinationCreationDialogComponent', () => {
  let component: DestinationCreationDialogComponent;
  let fixture: ComponentFixture<DestinationCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
