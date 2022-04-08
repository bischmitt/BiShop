import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPagamentoComponent } from './confirmar-pagamento.component';

describe('ConfirmarPagamentoComponent', () => {
  let component: ConfirmarPagamentoComponent;
  let fixture: ComponentFixture<ConfirmarPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
