import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionListaUsuarioComponent } from './opinion-lista-usuario.component';

describe('OpinionListaUsuarioComponent', () => {
  let component: OpinionListaUsuarioComponent;
  let fixture: ComponentFixture<OpinionListaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionListaUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionListaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
