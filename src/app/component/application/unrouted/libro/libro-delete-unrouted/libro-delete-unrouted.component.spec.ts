import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDeleteUnroutedComponent } from './libro-delete-unrouted.component';

describe('LibroDeleteUnroutedComponent', () => {
  let component: LibroDeleteUnroutedComponent;
  let fixture: ComponentFixture<LibroDeleteUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroDeleteUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroDeleteUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
