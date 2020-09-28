import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynRosterEntryComponent } from './syn-roster-entry.component';

describe('SynEntryContentComponent', () => {
  let component: SynRosterEntryComponent;
  let fixture: ComponentFixture<SynRosterEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynRosterEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynRosterEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
