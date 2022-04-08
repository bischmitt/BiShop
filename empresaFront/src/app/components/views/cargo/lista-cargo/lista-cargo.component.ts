import { CargoService } from '../../../../services/cargo.service';
import { Cargo } from '../../../../models/cargoModel';
import { Component, OnInit } from '@angular/core';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-cargo',
  templateUrl: './lista-cargo.component.html',
  styleUrls: ['./lista-cargo.component.sass']
})
export class ListaCargoComponent implements OnInit {

  cargos: any = []

  constructor(
    private cargoService: CargoService,
    private supervisorService: SupervisorService,
    private router: Router) { }

  ngOnInit(): void {
    this.mostrarTodosCargos();
  }

  mostrarTodosCargos() {
    this.cargoService.buscarTodosCargos().subscribe(resultado => {
      //this.cargos = resultado;
      console.log("aqui")
      console.log(this.cargos)

      resultado.forEach((cargo: any[]) => {

        let cargoComSupervisor: any = {
          id_cargo: '',
          car_nome: '',
          car_atribuicao: '',
          id_supervisor: '',
          spvisor_nome: '',
          spvisor_formacao: ''
        }

        cargoComSupervisor.id_cargo = cargo[0]
        cargoComSupervisor.car_nome = cargo[1]
        cargoComSupervisor.car_atribuicao = cargo[2]
        if (cargo[3] != null) {
          cargoComSupervisor.id_supervisor = cargo[3]
          cargoComSupervisor.spvisor_nome = cargo[4]
          cargoComSupervisor.spvisor_formacao = cargo[5]
        } else {
          cargoComSupervisor.id_supervisor = 0
          cargoComSupervisor.spvisor_nome = "----"
          cargoComSupervisor.spvisor_formacao = "----"
        }
        this.cargos.push(cargoComSupervisor)
        //console.log(this.cargos)
      });
    })
  }

  navegarCadastroCargo() {
    this.router.navigate(['/cargo/cadastro'])
  }

  deletarCargo(id: any) {
  }
}
