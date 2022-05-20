import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCardNovedadComponent } from './libro-card-novedad.component';

describe('LibroCardNovedadComponent', () => {
  let component: LibroCardNovedadComponent;
  let fixture: ComponentFixture<LibroCardNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroCardNovedadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroCardNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
