import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bonificacao } from 'src/app/models/bonificacaoModel';
import { BonificacaoService } from 'src/app/services/bonificacao.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-bonificacao',
  templateUrl: './edicao-bonificacao.component.html',
  styleUrls: ['./edicao-bonificacao.component.sass']
})
export class EdicaoBonificacaoComponent implements OnInit {

  codigo: any
  id_funcionario: any

  bonificacao: Bonificacao = {
    codigo: '',
    bo_descricao: '',
    bo_data_pagamento: '',
    bo_status: '',
    bo_valor: 0
  }

  constructor(private bonificacaoService: BonificacaoService,
    private route: ActivatedRoute,
    private location: Location,
    public notifyService: NotifyService) { }

  ngOnInit(): void {
    this.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.buscarBonificacao()
  }

  buscarBonificacao() {
    this.bonificacaoService.buscarUmaBonificacao(this.codigo).subscribe(resultado => {
      this.bonificacao = resultado
      console.log(resultado.bo_data_pagamento)
      this.bonificacao.bo_data_pagamento = resultado.bo_data_pagamento.slice(0, 10)
      console.log(this.bonificacao.bo_data_pagamento)
    })
  }

  editarBonificacao() {
    this.bonificacaoService.editarBonificacao(this.bonificacao, this.codigo, this.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify("bonificacao alterado com sucesso")
        this.location.back()
      },
      error: () => {
        this.notifyService.notify("Erro: bonificacao não editado")
        this.location.back()
      }
    })
  }
}
