import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroNewComponent } from './libro-new.component';

describe('NewComponent', () => {
  let component: LibroNewComponent;
  let fixture: ComponentFixture<LibroNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
