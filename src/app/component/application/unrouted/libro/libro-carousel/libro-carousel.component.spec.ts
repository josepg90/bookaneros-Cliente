import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroCarouselComponent } from './libro-carousel.component';

describe('LibroComponent', () => {
  let component: LibroCarouselComponent;
  let fixture: ComponentFixture<LibroCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
