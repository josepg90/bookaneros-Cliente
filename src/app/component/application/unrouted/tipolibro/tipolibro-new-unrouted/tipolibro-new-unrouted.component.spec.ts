import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolibroNewUnroutedComponent } from './tipolibro-new-unrouted.component';

describe('TipolibroNewUnroutedComponent', () => {
  let component: TipolibroNewUnroutedComponent;
  let fixture: ComponentFixture<TipolibroNewUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipolibroNewUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolibroNewUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
