import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSocialComponent } from './chat-social.component';

describe('ChatSocialComponent', () => {
  let component: ChatSocialComponent;
  let fixture: ComponentFixture<ChatSocialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatSocialComponent]
    });
    fixture = TestBed.createComponent(ChatSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
