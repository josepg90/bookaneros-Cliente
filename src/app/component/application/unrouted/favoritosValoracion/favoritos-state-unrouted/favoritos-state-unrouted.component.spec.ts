import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosStateUnroutedComponent } from './favoritos-state-unrouted.component';

describe('FavoritosStateUnroutedComponent', () => {
  let component: FavoritosStateUnroutedComponent;
  let fixture: ComponentFixture<FavoritosStateUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritosStateUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosStateUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
