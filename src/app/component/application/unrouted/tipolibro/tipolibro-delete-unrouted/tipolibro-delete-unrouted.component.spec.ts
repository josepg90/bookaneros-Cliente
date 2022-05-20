import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolibroDeleteUnroutedComponent } from './tipolibro-delete-unrouted.component';

describe('TipolibroDeleteUnroutedComponent', () => {
  let component: TipolibroDeleteUnroutedComponent;
  let fixture: ComponentFixture<TipolibroDeleteUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipolibroDeleteUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolibroDeleteUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
