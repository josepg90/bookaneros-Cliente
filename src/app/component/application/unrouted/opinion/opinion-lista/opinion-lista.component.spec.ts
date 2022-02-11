import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionListaComponent } from './opinion-lista.component';

describe('OpinionListaComponent', () => {
  let component: OpinionListaComponent;
  let fixture: ComponentFixture<OpinionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpinionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpinionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
