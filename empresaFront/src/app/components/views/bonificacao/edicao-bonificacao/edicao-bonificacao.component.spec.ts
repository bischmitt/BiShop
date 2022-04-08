import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoBonificacaoComponent } from './edicao-bonificacao.component';

describe('EdicaoBonificacaoComponent', () => {
  let component: EdicaoBonificacaoComponent;
  let fixture: ComponentFixture<EdicaoBonificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoBonificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoBonificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
