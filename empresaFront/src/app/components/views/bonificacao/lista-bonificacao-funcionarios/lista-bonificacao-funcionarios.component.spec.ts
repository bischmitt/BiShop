import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBonificacaoFuncionariosComponent } from './lista-bonificacao-funcionarios.component';

describe('ListaBonificacaoFuncionariosComponent', () => {
  let component: ListaBonificacaoFuncionariosComponent;
  let fixture: ComponentFixture<ListaBonificacaoFuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBonificacaoFuncionariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBonificacaoFuncionariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
