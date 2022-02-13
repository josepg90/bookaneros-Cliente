import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNewUnroutedComponent } from './usuario-new-unrouted.component';

describe('UsuarioNewUnroutedComponent', () => {
  let component: UsuarioNewUnroutedComponent;
  let fixture: ComponentFixture<UsuarioNewUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioNewUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNewUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
