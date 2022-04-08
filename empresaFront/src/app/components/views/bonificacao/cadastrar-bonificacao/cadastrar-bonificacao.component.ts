import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Bonificacao } from 'src/app/models/bonificacaoModel';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-bonificacao',
  templateUrl: './cadastrar-bonificacao.component.html',
  styleUrls: ['./cadastrar-bonificacao.component.sass']
})
export class CadastrarBonificacaoComponent implements OnInit {

  id_funcionario: any

  bonificacao: Bonificacao = {
    codigo: '',
    bo_descricao: '',
    bo_data_pagamento: '',
    bo_status: 'PENDENTE',
    bo_valor: 0
  }

  constructor(
    private bonificacaoService: BonificacaoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public notifyService: NotifyService) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
  }

  cadastrarBonificacao() {
    this.bonificacaoService.cadastrarBonificacao(this.bonificacao, this.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify("Bonificação cadastrada com sucesso!")
        this.location.back()
      },
      error: () => {
        this.notifyService.notify("Erro ao cdastrar bonificação!")
        this.location.back()
      }
    })
  }
}
