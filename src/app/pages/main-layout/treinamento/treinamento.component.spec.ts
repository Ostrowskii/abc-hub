import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinamentoComponent } from './treinamento.component';

describe('TreinamentoComponent', () => {
  let component: TreinamentoComponent;
  let fixture: ComponentFixture<TreinamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreinamentoComponent]
    });
    fixture = TestBed.createComponent(TreinamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
