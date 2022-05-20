import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolibroListaupdateUnroutedComponent } from './tipolibro-listaupdate-unrouted.component';

describe('TipolibroListaupdateUnroutedComponent', () => {
  let component: TipolibroListaupdateUnroutedComponent;
  let fixture: ComponentFixture<TipolibroListaupdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipolibroListaupdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolibroListaupdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
