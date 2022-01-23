import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroViewComponent } from './libro-view.component';

describe('ViewComponent', () => {
  let component: LibroViewComponent;
  let fixture: ComponentFixture<LibroViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
