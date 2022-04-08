import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { NotifyService } from './../../../../services/notify.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Supervisor } from 'src/app/models/supervisorModel';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastrar-supervisor',
  templateUrl: './cadastrar-supervisor.component.html',
  styleUrls: ['./cadastrar-supervisor.component.sass']
})
export class CadastrarSupervisorComponent implements OnInit {

  idSupervisorCadastrado: any

  foto: any

  supervisorCadastrado: boolean = false

  form !: FormGroup

  supervisor: Supervisor = {
    id_supervisor: '',
    spvisor_nome: '',
    spvisor_formacao: '',
    spvisor_foto: undefined,
    spvisor_cidade: ''
  }

  constructor(
    private supervisorService: SupervisorService,
    private httpClient: HttpClient,
    private location: Location,
    public notifyService: NotifyService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  cadastrarSupervisor() {
    this.supervisorService.cadastrarSupervisor(this.supervisor).subscribe({
      complete: () => {
        this.notifyService.notify("Supervisor cadastrado com sucesso! Gostaria de adicionar uma foto ao supervisor?")
        this.supervisorService.buscarSupervisorPeloNome(this.supervisor.spvisor_nome)
          .subscribe(resultado => {
            console.log(resultado)
            this.idSupervisorCadastrado = resultado.id_supervisor
            this.supervisorCadastrado = true
          })
      },
      error: () => { this.notifyService.notify("Erro: Não foi possível cadastrar o supervisor") }
    })
  }

  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome: string = this.supervisor.spvisor_nome + "-" + event.target.files[0].name

      //http://localhost:8080/empresa/envio/1?nome=bischmitt
      this.httpClient.post(`http://localhost:8080/empresa/envio/${this.idSupervisorCadastrado}?nome=${nome}`, formData).subscribe({
        next: () => console.log("Foto enviada")
      })

      this.notifyService.notify("Foto anexada ao Supervisor!")
      this.location.back();
    }
  }
}
