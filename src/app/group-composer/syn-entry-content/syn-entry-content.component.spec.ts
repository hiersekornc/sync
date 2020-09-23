import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SynEntryContentComponent } from './syn-entry-content.component';

describe('SynEntryContentComponent', () => {
  let component: SynEntryContentComponent;
  let fixture: ComponentFixture<SynEntryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SynEntryContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SynEntryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
