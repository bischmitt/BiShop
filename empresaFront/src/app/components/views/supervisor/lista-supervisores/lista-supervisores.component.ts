import { Supervisor } from '../../../../models/supervisorModel';
import { Component, OnInit } from '@angular/core';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-supervisores',
  templateUrl: './lista-supervisores.component.html',
  styleUrls: ['./lista-supervisores.component.sass']
})
export class ListaSupervisoresComponent implements OnInit {

  supervisores: any = []

  constructor(
    private supervisorService: SupervisorService,
    private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosSupervisores()
  }

  buscarTodosSupervisores() {
    this.supervisorService.buscarTodosSupervisores().subscribe(resultado => {
      console.log(resultado)
      resultado.forEach((supervisor: any[]) => {
        let supervisorComCargo: any = {
          id_supervisor: '',
          spvisor_nome: '',
          spvisor_formacao: '',
          spvisor_foto: '',
          spvisor_cidade: '',
          id_cargo: '',
          car_nome: '',
          car_atribuicao: ''
        }

        supervisorComCargo.id_supervisor = supervisor[0]
        supervisorComCargo.spvisor_nome = supervisor[1]
        supervisorComCargo.spvisor_formacao = supervisor[2]
        supervisorComCargo.spvisor_foto = supervisor[3]
        supervisorComCargo.spvisor_cidade = supervisor[4]
        if (supervisor[5] != null) {
          supervisorComCargo.id_cargo = supervisor[5]
          supervisorComCargo.car_nome = supervisor[6]
          supervisorComCargo.car_atribuicao = supervisor[7]
        } else {
          supervisorComCargo.id_cargo = 0
          supervisorComCargo.car_nome = "----"
          supervisorComCargo.car_atribuicao = "----"
        }
        this.supervisores.push(supervisorComCargo)
      });
    })
  }
}
