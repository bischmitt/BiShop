import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionarioModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-funcionarios-do-cargo',
  templateUrl: './lista-funcionarios-do-cargo.component.html',
  styleUrls: ['./lista-funcionarios-do-cargo.component.sass']
})
export class ListaFuncionariosDoCargoComponent implements OnInit {

  id_cargo: any

  funcionarios: Funcionario[] = []

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    this.mostrarFuncionariosDoCargo()
  }

  mostrarFuncionariosDoCargo() {
    this.funcionarioService.buscarFuncionariosCargo(this.id_cargo).subscribe(res => {
      this.funcionarios = res
      console.log(this.funcionarios)
    })
  }

  voltar() {
    this.location.back()
  }
}
