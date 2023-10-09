import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMessageAiComponent } from './search-message-ai.component';

describe('SearchMessageAiComponent', () => {
  let component: SearchMessageAiComponent;
  let fixture: ComponentFixture<SearchMessageAiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchMessageAiComponent]
    });
    fixture = TestBed.createComponent(SearchMessageAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
