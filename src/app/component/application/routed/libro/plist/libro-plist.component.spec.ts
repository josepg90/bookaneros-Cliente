import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroPlistComponent } from './libro-plist.component';

describe('PlistComponent', () => {
  let component: LibroPlistComponent;
  let fixture: ComponentFixture<LibroPlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroPlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroPlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
