import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroUpdateUnroutedComponent } from './libro-update-unrouted.component';

describe('LibroUpdateUnroutedComponent', () => {
  let component: LibroUpdateUnroutedComponent;
  let fixture: ComponentFixture<LibroUpdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroUpdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroUpdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
