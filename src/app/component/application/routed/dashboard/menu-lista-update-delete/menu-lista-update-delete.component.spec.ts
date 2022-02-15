import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListaUpdateDeleteComponent } from './menu-lista-update-delete.component';

describe('MenuListaUpdateDeleteComponent', () => {
  let component: MenuListaUpdateDeleteComponent;
  let fixture: ComponentFixture<MenuListaUpdateDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuListaUpdateDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListaUpdateDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
