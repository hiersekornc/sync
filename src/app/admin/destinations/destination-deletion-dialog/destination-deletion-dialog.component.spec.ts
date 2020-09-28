import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationDeletionDialogComponent } from './destination-deletion-dialog.component';

describe('DestinationDeletionDialogComponent', () => {
  let component: DestinationDeletionDialogComponent;
  let fixture: ComponentFixture<DestinationDeletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationDeletionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
