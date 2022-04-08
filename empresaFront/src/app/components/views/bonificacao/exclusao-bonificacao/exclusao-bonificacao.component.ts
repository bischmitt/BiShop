import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bonificacao } from 'src/app/models/bonificacaoModel';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-bonificacao',
  templateUrl: './exclusao-bonificacao.component.html',
  styleUrls: ['./exclusao-bonificacao.component.sass']
})
export class ExclusaoBonificacaoComponent implements OnInit {

  codigo:any

  id_funcionario:any

  statusEscolhidoNoSelect:any

  statusParaEscolha:string[] = []

  bonificacao:Bonificacao ={
    codigo:'',
    bo_descricao:'',
    bo_data_pagamento:'',
    bo_status:'',
    bo_valor:0
  }

  constructor(private bonificacaoService:BonificacaoService,
              private route:ActivatedRoute,
              private router:Router,
              private notifyService:NotifyService,
              private location: Location) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.statusParaEscolha = ['RECEBIDO','CANCELADO','PENDENTE']
    this.mostrarBonificacao()
  }

  mostrarBonificacao(){
    this.bonificacaoService.buscarUmaBonificacao(this.codigo).subscribe(resultado =>{
      this.bonificacao = resultado
      this.bonificacao.bo_status = resultado.bo_status
    })
  }

  excluirBonificacao(){
    this.bonificacaoService.excluirBonificacao(this.codigo).subscribe({
      complete: () => {this.notifyService.notify("Bonificação exclída com sucesso")
                      this.location.back()},
      error: () => {this.notifyService.notify("Erro: Bonificação não foi excluída!")}
    })
  }

  statusEscolhido(){
    console.log(this.statusEscolhidoNoSelect)
    this.bonificacao.bo_status = this.statusEscolhidoNoSelect
  }
}