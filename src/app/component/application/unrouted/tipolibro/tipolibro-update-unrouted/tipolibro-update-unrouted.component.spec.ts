import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolibroUpdateUnroutedComponent } from './tipolibro-update-unrouted.component';

describe('TipolibroUpdateUnroutedComponent', () => {
  let component: TipolibroUpdateUnroutedComponent;
  let fixture: ComponentFixture<TipolibroUpdateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipolibroUpdateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolibroUpdateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
