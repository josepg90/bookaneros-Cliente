import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListaPeticionesComponent } from './menu-lista-peticiones.component';

describe('MenuListaPeticionesComponent', () => {
  let component: MenuListaPeticionesComponent;
  let fixture: ComponentFixture<MenuListaPeticionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListaPeticionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListaPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
