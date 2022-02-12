import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionNewUnroutedComponent } from './opinion-new-unrouted.component';

describe('OpinionNewUnroutedComponent', () => {
  let component: OpinionNewUnroutedComponent;
  let fixture: ComponentFixture<OpinionNewUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionNewUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionNewUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
