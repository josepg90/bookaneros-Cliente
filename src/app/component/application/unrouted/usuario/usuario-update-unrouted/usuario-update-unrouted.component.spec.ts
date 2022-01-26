import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUpdateUnroutedComponent } from './usuario-update-unrouted.component';

describe('UsuarioUpdateUnroutedComponent', () => {
  let component: UsuarioUpdateUnroutedComponent;
  let fixture: ComponentFixture<UsuarioUpdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioUpdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioUpdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
