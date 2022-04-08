import { Location } from '@angular/common';
import { NotifyService } from '../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionarioModel';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-exclusao-funcionario',
  templateUrl: './exclusao-funcionario.component.html',
  styleUrls: ['./exclusao-funcionario.component.sass']
})
export class ExclusaoFuncionarioComponent implements OnInit {
  id_cargo: string = '';

  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_formacao: '',
  };

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private location:Location,
    public notifyService: NotifyService
  ) {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.funcionario.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario');
  }

  ngOnInit(): void {
    this.buscarUmFuncionario()
  }

  buscarUmFuncionario() {
    this.funcionarioService.buscarUmFuncionario(this.funcionario.id_funcionario).subscribe((res) => {
      this.funcionario = res
      console.log(this.funcionario)
    })
  }

  excluirFuncionario() {
    this.funcionarioService.excluirFuncionario(this.funcionario.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify('Funcionário excluído com sucesso!');
        this.location.back()
      },
      error: () => {
        this.notifyService.notify('Erro ao excluir funcionário!');
      },
      next: () => {
        console.log('Funcionário excluído');
      },
    })
  }
}
