import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesListaUnroutedComponent } from './peticiones-lista-unrouted.component';

describe('PeticionesListaUnroutedComponent', () => {
  let component: PeticionesListaUnroutedComponent;
  let fixture: ComponentFixture<PeticionesListaUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeticionesListaUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesListaUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
