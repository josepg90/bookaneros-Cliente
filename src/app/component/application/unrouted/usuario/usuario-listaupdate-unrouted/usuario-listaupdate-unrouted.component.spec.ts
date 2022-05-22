import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListaupdateUnroutedComponent } from './usuario-listaupdate-unrouted.component';

describe('UsuarioListaupdateUnroutedComponent', () => {
  let component: UsuarioListaupdateUnroutedComponent;
  let fixture: ComponentFixture<UsuarioListaupdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioListaupdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioListaupdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
