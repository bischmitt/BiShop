import { NotifyService } from './../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargoModel';
import { Supervisor } from 'src/app/models/supervisorModel';
import { CargoService } from 'src/app/services/cargo.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-atribuir-cargo-supervisor',
  templateUrl: './atribuir-cargo-supervisor.component.html',
  styleUrls: ['./atribuir-cargo-supervisor.component.sass']
})
export class AtribuirCargoSupervisorComponent implements OnInit {

  id_supervisor: any

  cargosSemSupervisor: any
  cargoSemSupervisorEscolhido: any = []
  supervisorSemCargoEscolhido: any = []

  supervisor: Supervisor = {
    id_supervisor: '',
    spvisor_nome: '',
    spvisor_formacao: '',
    spvisor_foto: '',
    spvisor_cidade: ''
  }

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private supervisorService: SupervisorService,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService,
    public notifyService: NotifyService) { }

  ngOnInit(): void {

    this.id_supervisor = this.route.snapshot.paramMap.get('id_supervisor')
    this.buscarSupervisor()
    this.buscarSupervisorDoCargo()
    this.buscarCargoSemSupervisor()
  }

  buscarSupervisor() {
    this.supervisorService.buscarUmSupervisor(this.id_supervisor).subscribe(resultado => {
      this.supervisor = resultado
    })
  }

  buscarSupervisorDoCargo() {
    this.cargoService.buscarCargoDoSupervisor(this.id_supervisor).subscribe(resultado => {
      if (resultado == null) {
        this.notifyService.notify("Não há um cargo definido para este funcionário")

      } else {
        this.cargo = resultado
        console.log(resultado);
      }
    })
  }

  buscarCargoSemSupervisor() {
    this.cargoService.mostrarCargosSemSupervisor().subscribe((resultado) => {
      this.cargosSemSupervisor = resultado
      console.log(resultado);
    })
  }

  escolherCargo() {
    console.log(this.cargoSemSupervisorEscolhido)
    this.cargo = this.cargoSemSupervisorEscolhido
  }

  atribuirCargo() {
    this.supervisorService.buscarUmSupervisor(this.id_supervisor).subscribe((resultado) => {
      this.supervisor = resultado
    })
    this.cargoService.atribuirSupervisor(this.cargo, this.cargo.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify("O cargo foi atribuído ao supervisor!")
        this.router.navigate(['/supervisores'])
      },
      error: () => {
        this.notifyService.notify("Erro: o cargo não foi atribuído ao supervisor!")
      }
    })
  }

  deixarCargoSemSupervisor() {
    this.cargoService.deixarCargoSemSupervisor(this.cargo, this.cargo.id_cargo, this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify("O supervisor está sem cargo!")
        //this.router.navigate(['/cargo'])
      },
      error: () => {
        this.notifyService.notify("Erro: o supervisor não foi retirado do cargo!")
        //this.router.navigate(['/cargo'])
      }
    })
  }
}
