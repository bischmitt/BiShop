import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarBonificacaoComponent } from './cadastrar-bonificacao.component';

describe('CadastrarBonificacaoComponent', () => {
  let component: CadastrarBonificacaoComponent;
  let fixture: ComponentFixture<CadastrarBonificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarBonificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarBonificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
