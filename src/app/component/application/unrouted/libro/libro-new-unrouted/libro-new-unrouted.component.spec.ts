import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroNewUnroutedComponent } from './libro-new-unrouted.component';

describe('LibroNewUnroutedComponent', () => {
  let component: LibroNewUnroutedComponent;
  let fixture: ComponentFixture<LibroNewUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroNewUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroNewUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
