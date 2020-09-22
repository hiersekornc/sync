import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupComposerComponent } from './group-composer.component';

describe('GroupComposerComponent', () => {
  let component: GroupComposerComponent;
  let fixture: ComponentFixture<GroupComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
