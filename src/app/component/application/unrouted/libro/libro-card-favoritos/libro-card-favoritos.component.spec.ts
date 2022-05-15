import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCardFavoritosComponent } from './libro-card-favoritos.component';

describe('LibroCardFavoritosComponent', () => {
  let component: LibroCardFavoritosComponent;
  let fixture: ComponentFixture<LibroCardFavoritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroCardFavoritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroCardFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
