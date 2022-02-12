import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionDeleteUnroutedComponent } from './opinion-delete-unrouted.component';

describe('OpinionDeleteUnroutedComponent', () => {
  let component: OpinionDeleteUnroutedComponent;
  let fixture: ComponentFixture<OpinionDeleteUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionDeleteUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionDeleteUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
