import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonNavBarComponent } from './botton-nav-bar.component';

describe('BottonNavBarComponent', () => {
  let component: BottonNavBarComponent;
  let fixture: ComponentFixture<BottonNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottonNavBarComponent]
    });
    fixture = TestBed.createComponent(BottonNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
