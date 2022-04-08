import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Supervisor } from 'src/app/models/supervisorModel';
import { NotifyService } from 'src/app/services/notify.service';
import { SupervisorService } from 'src/app/services/supervisor.service';

@Component({
  selector: 'app-edicao-supervisor',
  templateUrl: './edicao-supervisor.component.html',
  styleUrls: ['./edicao-supervisor.component.sass']
})
export class EdicaoSupervisorComponent implements OnInit {

  foto: any

  id_supervisor: any

  idSupervisorEditado: any

  supervisorEditado: boolean = false

  supervisor: Supervisor = {
    id_supervisor: '',
    spvisor_nome: '',
    spvisor_formacao: '',
    spvisor_foto: '',
    spvisor_cidade: ''
  }

  constructor(
    private supervisorService: SupervisorService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location,
    public notifyService: NotifyService
  ) {
    // this.supervisor.id_supervisor = this.route.snapshot.paramMap.get('id_supervisor')
    this.id_supervisor = this.route.snapshot.paramMap.get('id_supervisor')
  }

  ngOnInit(): void {
    this.buscarUmSupervisor()
  }

  buscarUmSupervisor() {
    this.supervisorService.buscarUmSupervisor(this.id_supervisor).subscribe((res => {
      this.supervisor = res
      console.log(this.supervisor)
    }))
  }

  editarSupervisor() {
    this.supervisorService.editarSupervisor(this.supervisor, this.id_supervisor).subscribe({
      complete: () => {
        this.notifyService.notify("Supervisor editado com sucesso!")
        this.supervisorEditado = true
        this.supervisorService.buscarSupervisorPeloNome(this.supervisor.spvisor_nome)
          .subscribe(res => {
            this.idSupervisorEditado = res.id_supervisor
            this.supervisorEditado = true
            this.supervisor = res
          })
      },
      error: () => {
        this.notifyService.notify('Erro ao editar supervisor!');
      },
      next: () => {
        console.log('Supervisor editado');
      },
    })
  }

  editarFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome: string = this.supervisor.spvisor_nome + "-" + event.target.files[0].name

      //http://localhost:8080/empresa/envio/1?nome=bischmitt
      this.httpClient.post(`http://localhost:8080/empresa/envio/${this.idSupervisorEditado}?nome=${nome}`, formData).subscribe({
        next: () => console.log("Foto enviada")
      })
      this.notifyService.notify("Foto anexada ao Supervisor!")
      this.location.back()
    }
  }
}
