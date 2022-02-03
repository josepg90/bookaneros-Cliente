import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipolibroPlistUnroutedComponent } from './tipolibro-plist-unrouted.component';

describe('TipolibroPlistUnroutedComponent', () => {
  let component: TipolibroPlistUnroutedComponent;
  let fixture: ComponentFixture<TipolibroPlistUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipolibroPlistUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipolibroPlistUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
