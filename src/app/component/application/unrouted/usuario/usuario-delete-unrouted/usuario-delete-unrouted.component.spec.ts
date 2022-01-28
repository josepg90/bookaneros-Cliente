import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDeleteUnroutedComponent } from './usuario-delete-unrouted.component';

describe('UsuarioDeleteUnroutedComponent', () => {
  let component: UsuarioDeleteUnroutedComponent;
  let fixture: ComponentFixture<UsuarioDeleteUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDeleteUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioDeleteUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
