import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosValoracionNewUnroutedComponent } from './favoritos-valoracion-new-unrouted.component';

describe('FavoritosValoracionNewUnroutedComponent', () => {
  let component: FavoritosValoracionNewUnroutedComponent;
  let fixture: ComponentFixture<FavoritosValoracionNewUnroutedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritosValoracionNewUnroutedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritosValoracionNewUnroutedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
