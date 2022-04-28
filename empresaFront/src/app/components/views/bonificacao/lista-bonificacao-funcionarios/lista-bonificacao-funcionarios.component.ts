import { NotifyService } from 'src/app/services/notify.service';
import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bonificacao } from 'src/app/models/bonificacaoModel';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lista-bonificacao-funcionarios',
  templateUrl: './lista-bonificacao-funcionarios.component.html',
  styleUrls: ['./lista-bonificacao-funcionarios.component.sass'],
})
export class ListaBonificacaoFuncionariosComponent implements OnInit {
  displayedColumns = [
    'codigo',
    'bo_descricao',
    'bo_data_pagamento',
    'bo_valor',
    'bo_status',
    'pagar',
    'acoes',
  ];

  id_funcionario: any;

  nomeFuncionario: any;

  recebido: boolean = false;

  cancelado: boolean = false;

  bonificacoes: Bonificacao[] = [];

  filterBonificacoes: Bonificacao[] = [];

  filterBy!: string;

  bonificacao: Bonificacao = {
    codigo: '',
    bo_descricao: '',
    bo_data_pagamento: '',
    bo_status: '',
    bo_valor: 0,
  };

  constructor(
    private bonificacaoService: BonificacaoService,
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public notifyService: NotifyService,
    public dialog: MatDialog
  ) {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario');
  }

  ngOnInit(): void {
    this.listarBonificacaoDoFuncionario();
    this.buscarFuncionario();
  }

  listarBonificacaoDoFuncionario() {
    this.bonificacaoService
      .listarBonificacoesDoFuncionario(this.id_funcionario)
      .subscribe((resultado) => {
        this.bonificacoes = resultado;
        console.log(resultado);
      });
  }

  buscarFuncionario() {
    this.funcionarioService
      .buscarUmFuncionario(this.id_funcionario)
      .subscribe((resultado) => {
        this.nomeFuncionario = resultado.func_nome;
      });
  }

  quitarBonificacao(codigo: any) {
    this.bonificacaoService
      .buscarUmaBonificacao(codigo)
      .subscribe((resultado) => {
        this.bonificacao = resultado;
        console.log(this.bonificacao);
        this.bonificacaoService
          .quitarBonificacao(this.bonificacao, this.bonificacao.codigo)
          .subscribe({
            complete: () => {
              this.notifyService.notify(
                'Bonificação paga ao funcionário com sucesso!'
              );
              this.listarBonificacaoDoFuncionario();
            },
            error: () => {
              this.notifyService.notify(
                'Erro ao pagar bonificação ao funcionário!'
              );
            },
          });
      });
  }

  cancelarBonificacao(codigo: any) {
    this.bonificacaoService
      .buscarUmaBonificacao(codigo)
      .subscribe((resultado) => {
        this.bonificacao = resultado;
        console.log(this.bonificacao);
        this.bonificacaoService
          .cancelarBonificacao(this.bonificacao, this.bonificacao.codigo)
          .subscribe({
            complete: () => {
              this.notifyService.notify('Bonificação cancelada com sucesso!');
              this.listarBonificacaoDoFuncionario();
            },
            error: () => {
              this.notifyService.notify('Erro ao cancelar bonificação!');
            },
          });
      });
  }

  voltar() {
    this.location.back();
  }

  set filter(value: string) {
    this.filterBy = value;

    this.bonificacoes = this.bonificacoes.filter(
      (bonificacao: Bonificacao) =>
        bonificacao.bo_descricao
          .toLocaleLowerCase()
          .indexOf(this.filterBy.toLocaleLowerCase()) > -1
    );
  }

  get filter() {
    return this.filterBy;
  }
}
