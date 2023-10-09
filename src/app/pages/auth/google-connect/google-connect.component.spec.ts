import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleConnectComponent } from './google-connect.component';

describe('GoogleConnectComponent', () => {
  let component: GoogleConnectComponent;
  let fixture: ComponentFixture<GoogleConnectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleConnectComponent]
    });
    fixture = TestBed.createComponent(GoogleConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
