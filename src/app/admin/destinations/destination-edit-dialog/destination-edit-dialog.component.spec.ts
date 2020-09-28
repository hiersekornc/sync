import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationEditDialogComponent } from './destination-edit-dialog.component';

describe('DestinationEditDialogComponent', () => {
  let component: DestinationEditDialogComponent;
  let fixture: ComponentFixture<DestinationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinationEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
