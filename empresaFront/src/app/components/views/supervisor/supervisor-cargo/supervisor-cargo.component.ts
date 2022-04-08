import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CargoService } from 'src/app/services/cargo.service';
import { SupervisorService } from '../../../../services/supervisor.service';
import { Component, OnInit } from '@angular/core';
import { Supervisor } from 'src/app/models/supervisorModel';
import { Cargo } from 'src/app/models/cargoModel';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-supervisor-cargo',
  templateUrl: './supervisor-cargo.component.html',
  styleUrls: ['./supervisor-cargo.component.sass']
})
export class SupervisorCargoComponent implements OnInit {

  id_cargo: any

  supervisorCadastrado: boolean = false

  supervisoresSemCargo: any

  supervisorEscolhido: any = []

  supervisor: Supervisor = {
    id_supervisor: '',
    spvisor_nome: '',
    spvisor_formacao: '',
    spvisor_cidade: '',
    spvisor_foto: ''
  }

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(
    private supervisorService: SupervisorService,
    private cargoService: CargoService,
    private router: Router,
    private route: ActivatedRoute,
    public notifyService: NotifyService
  ) {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')
  }

  ngOnInit(): void {
    this.buscarCargo()
    this.buscarSupervisorCargo();
    this.buscarSupervisoresSemCargo();
  }

  buscarCargo() {
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(res => {
      this.cargo = res
    })
  }

  buscarSupervisorCargo() {
    this.supervisorService.buscarSupervisorCargo(this.id_cargo).subscribe(res => {

      if (res == undefined) {
        this.notifyService.notify('Este cargo ainda não tem um supervisor definido!')
        this.supervisorCadastrado = false
        console.log(res)
      } else {
        this.supervisor = res
        this.supervisorCadastrado = true
        console.log(res)
      }
      // console.log(this.supervisorEscolhido)
      // this.supervisor = this.supervisorEscolhido
    })
  }

  buscarSupervisoresSemCargo() {
    this.supervisorService.buscarSupervisoresSemCargo().subscribe(res => {
      this.supervisoresSemCargo = res
      console.log(this.supervisoresSemCargo)
    })
  }

  mostrarSupervisor() {
    console.log(this.supervisorEscolhido)
    this.supervisor = this.supervisorEscolhido
  }

  atribuirSupervisor() {
    this.cargoService.mostrarUmCargo(this.id_cargo).subscribe(res => {
      this.cargo = res
    })

    this.cargoService.atribuirSupervisor(this.cargo, this.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify(`Sucesso ao atribuir supervisor ao cargo ${this.id_cargo}!`)
        this.router.navigate(["/cargos"]);
      },
      error: () => {
        this.notifyService.notify(`Erro ao atribuir supervisor ao cargo ${this.id_cargo}!`)
        this.router.navigate(["/cargos"]);
      },
      next: () => { console.log(`Supervisor atribuído ao cargo ${this.id_cargo}`) }
    })
  }

  deixarCargoSemSupervisor() {
    this.cargoService.deixarCargoSemSupervisor(this.cargo, this.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify("O cargo agora está sem supervisor")
        this.router.navigate(['/cargo'])
      },
      error: () => {
        this.notifyService.notify("Erro: o supervisor não foi retirado do cargo")
        this.router.navigate(['/cargo'])
      }
    })
  }
}
