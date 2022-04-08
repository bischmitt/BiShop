import { HttpClient } from '@angular/common/http';
import { NotifyService } from '../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionarioModel';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicao-funcionario',
  templateUrl: './edicao-funcionario.component.html',
  styleUrls: ['./edicao-funcionario.component.sass']
})
export class EdicaoFuncionarioComponent implements OnInit {

  idFuncionarioEditado: any

  foto: any

  funcionarioEditado: boolean = false

  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_cidade: '',
    func_formacao: ''
  };

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router,
    public notifyService: NotifyService,
    private httpClient: HttpClient,
    private location: Location,
  ) {
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

  editarFuncionario() {
    this.funcionarioService.editarFuncionario(this.funcionario, this.funcionario.id_funcionario).subscribe({
      complete: () => {
        this.notifyService.notify('Funcionário editado com sucesso!');
        this.funcionarioEditado = true
        this.funcionarioService.buscarFuncionarioPeloNome(this.funcionario.func_nome)
          .subscribe(res => {
            this.idFuncionarioEditado = res.id_funcionario
            this.funcionario = res
          })
      },
      error: () => {
        this.notifyService.notify('Erro ao editar funcionário!');
      },
      next: () => {
        console.log('Funcionário editado');
      },
    })
  }

  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome: string = this.funcionario.func_nome + "-" + event.target.files[0].name

      //http://localhost:8080/empresa/envio/foto/funcionario/2?nome=bischmitt
      this.httpClient.post(`http://localhost:8080/empresa/envio/foto/funcionario/${this.idFuncionarioEditado}?nome=${nome}`, formData).subscribe({
        next: () => console.log("Foto enviada")
      })
      this.notifyService.notify("Foto anexada ao Supervisor!")
      this.location.back();
    }
  }

  /*   trocarCargo() {
      this.id_cargo = prompt("Para qual cargo você deseja transferir o funcionário?", "Digite o id do cargo")
      this.funcionarioService.editarFuncionario(this.funcionario, this.funcionario.id_funcionario).subscribe({
        complete: () => {
          this.notifyService.notify('Funcionário transferido com sucesso!');
          this.router.navigate([`/funcionarioCargo/${this.id_cargo}`]);
        },
        error: () => {
          this.notifyService.notify('Erro ao transferir funcionário!');
        },
        next: () => {
          console.log('Funcionário transferido');
        },
      })
    } */
}
