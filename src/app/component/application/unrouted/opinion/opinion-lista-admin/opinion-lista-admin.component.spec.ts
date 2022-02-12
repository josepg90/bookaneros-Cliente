import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionListaAdminComponent } from './opinion-lista-admin.component';

describe('OpinionListaComponent', () => {
  let component: OpinionListaAdminComponent;
  let fixture: ComponentFixture<OpinionListaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionListaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionListaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
