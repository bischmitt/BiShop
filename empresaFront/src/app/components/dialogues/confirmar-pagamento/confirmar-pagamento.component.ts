import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Location } from '@angular/common';
import { Bonificacao } from 'src/app/models/bonificacaoModel';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-pagamento',
  templateUrl: './confirmar-pagamento.component.html',
  styleUrls: ['./confirmar-pagamento.component.sass']
})
export class ConfirmarPagamentoComponent implements OnInit {

  id_funcionario: any

  nomeFuncionario: any

  recebido: boolean = false

  cancelado: boolean = false

  bonificacoes: Bonificacao[] = []

  bonificacao: Bonificacao = {
    codigo: '',
    bo_descricao: '',
    bo_data_pagamento: '',
    bo_status: '',
    bo_valor: 0
  }

  constructor(
    private bonificacaoService: BonificacaoService,
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
  }

  ngOnInit(): void {
    this.listarBonificacaoDoFuncionario()
    this.buscarFuncionario()
  }


  listarBonificacaoDoFuncionario() {
    this.bonificacaoService.listarBonificacoesDoFuncionario(this.id_funcionario).subscribe(resultado => {
      this.bonificacoes = resultado
      console.log(resultado)
    })
  }

  buscarFuncionario() {
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(resultado => {
      this.nomeFuncionario = resultado.func_nome
    })
  }

  quitarBonificacao(codigo: any) {
    this.bonificacaoService.buscarUmaBonificacao(codigo).subscribe(resultado => {
      this.bonificacao = resultado
      console.log(this.bonificacao)
      this.bonificacaoService.quitarBonificacao(this.bonificacao, this.bonificacao.codigo).subscribe({
        complete: () => {
          this.notifyService.notify("Bonificação recebida com sucesso")
          this.listarBonificacaoDoFuncionario()
        },
        error: () => { this.notifyService.notify("Erro: Bonificacao não quitado") }
      })
    })
  }

  cancelarBonificacao(codigo: any) {
    this.bonificacaoService.buscarUmaBonificacao(codigo).subscribe(resultado => {
      this.bonificacao = resultado
      console.log(this.bonificacao)
      this.bonificacaoService.cancelarBonificacao(this.bonificacao, this.bonificacao.codigo).subscribe({
        complete: () => {
          this.notifyService.notify("Bonificação cancelada com sucesso")
          this.listarBonificacaoDoFuncionario()
        },
        error: () => { this.notifyService.notify("Erro: Bonificação não cancelada") }
      })
    })
  }

}
