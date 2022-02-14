import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListaUnroutedComponent } from './usuario-lista-unrouted.component';

describe('UsuarioListaUnroutedComponent', () => {
  let component: UsuarioListaUnroutedComponent;
  let fixture: ComponentFixture<UsuarioListaUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioListaUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListaUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
