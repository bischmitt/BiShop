import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supervisor } from 'src/app/models/supervisorModel';
import { NotifyService } from 'src/app/services/notify.service';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-exclusao-supervisor',
  templateUrl: './exclusao-supervisor.component.html',
  styleUrls: ['./exclusao-supervisor.component.sass']
})
export class ExclusaoSupervisorComponent implements OnInit {

  supervisor: Supervisor = {
    id_supervisor: '',
    spvisor_nome: '',
    spvisor_formacao: '',
    spvisor_foto: '',
    spvisor_cidade: ''
  }

  constructor(
    private supervisorService: SupervisorService,
    private route: ActivatedRoute,
    private location: Location,
    public notifyService: NotifyService
  ) {
    this.supervisor.id_supervisor = this.route.snapshot.paramMap.get('id_supervisor')
  }

  ngOnInit(): void {
    this.buscarUmSupervisor()
  }

  buscarUmSupervisor() {
    this.supervisorService.buscarUmSupervisor(this.supervisor.id_supervisor).subscribe((res => {
      this.supervisor = res
      console.log(this.supervisor)
    }))
  }

  excluirSupervisor() {
    this.supervisorService.excluirSupervisor(this.supervisor.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify('Supervisor excluído com sucesso!');
        this.location.back()
      },
      error: () => {
        this.notifyService.notify('Erro ao excluir supervisor! Caso o supervisor esteja atribuído a um cargo, primeiro remova-o do cargo e depois dente excluí-lo novamente.');
      },
      next: () => {
        console.log('Supervisor excluído');
      },
    })
  }
}
