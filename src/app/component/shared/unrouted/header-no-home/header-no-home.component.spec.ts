import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNoHomeComponent } from './header-no-home.component';

describe('HeaderNoHomeComponent', () => {
  let component: HeaderNoHomeComponent;
  let fixture: ComponentFixture<HeaderNoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
