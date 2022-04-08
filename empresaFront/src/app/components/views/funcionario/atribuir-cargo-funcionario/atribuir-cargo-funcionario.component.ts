import { NotifyService } from './../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargoModel';
import { Funcionario } from 'src/app/models/funcionarioModel';
import { CargoService } from 'src/app/services/cargo.service';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo-funcionario',
  templateUrl: './atribuir-cargo-funcionario.component.html',
  styleUrls: ['./atribuir-cargo-funcionario.component.sass']
})
export class AtribuirCargoFuncionarioComponent implements OnInit {

  cargos: Cargo[] = []

  cargoEscolhido: any = []

  id_cargo: any

  id_funcionario: any

  cargoDoFuncionario: any = []

  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_formacao: '',
    func_cidade: ''
  }

  constructor(
    private cargoService: CargoService,
    private funcionarioService: FuncionarioService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    public notifyService: NotifyService) { }

  ngOnInit(): void {
    this.id_funcionario = this.route.snapshot.paramMap.get('id_funcionario')
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
    console.log(this.id_cargo)
    this.buscarTodasCargos()
    this.mostrarFuncionario()
    this.buscarCargo()
  }

  buscarTodasCargos() {
    this.cargoService.mostrarTodosCargos().subscribe(resultado => {
      this.cargos = resultado
    })
  }

  mostrarCargo() {
    console.log(this.cargoEscolhido)
  }

  mostrarFuncionario() {
    this.funcionarioService.buscarUmFuncionario(this.id_funcionario).subscribe(resultado => {
      this.funcionario = resultado
    })
  }

  buscarCargo() {
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(resultado => {
      this.cargoEscolhido = resultado
      console.log(this.cargoDoFuncionario)
    })
  }

  atribuirCargo() {
    this.funcionarioService.atribuirCargo(this.cargoEscolhido, this.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify("Funcionário cadastrado no cargo com sucesso!")
        this.location.back()
      },
      error: () => {
        this.notifyService.notify("Erro ao cadastrar funcionário no cargo!")
      },
      next: () => { console.log("Funcionário cadastrado com sucesso no cargo!") }
    });
  }

  deixarFuncionarioSemCargo() {
    this.funcionarioService.deixarFuncionarioSemCargo(this.funcionario, this.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify("Funcionário retirado do cargo com sucesso!")
      },
      error: () => {
        this.notifyService.notify(`Erro ao retirar funcionário do cargo ${this.id_cargo}`)
      },
      next: () => { console.log("Funcionario editado com sucesso") }
    });
  }

  voltar() {
    this.location.back()
  }
}
