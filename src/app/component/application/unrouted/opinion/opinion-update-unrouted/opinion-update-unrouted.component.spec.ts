import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionUpdateUnroutedComponent } from './opinion-update-unrouted.component';

describe('OpinionUpdateUnroutedComponent', () => {
  let component: OpinionUpdateUnroutedComponent;
  let fixture: ComponentFixture<OpinionUpdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionUpdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionUpdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
