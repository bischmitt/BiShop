import { HttpClient } from '@angular/common/http';
import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionarioModel';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { CargoService } from 'src/app/services/cargo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html',
  styleUrls: ['./cadastro-funcionario.component.sass'],
})
export class CadastroFuncionarioComponent implements OnInit {

  id_cargo: string = ''

  cargos: any

  cargoEscolhido: any

  idFuncionarioCadastrado: any

  foto: any

  funcionarioCadastrado: boolean = false

  funcionario: Funcionario = {
    id_funcionario: '',
    func_nome: '',
    func_formacao: '',
    func_cidade: '',
    func_foto: undefined
  }

  constructor(private funcionarioService: FuncionarioService,
    private cargoService: CargoService,
    private route: ActivatedRoute,
    public notifyService: NotifyService,
    private location: Location,
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!
    this.mostrarCargosParaAtribuicao()
  }

  cadastrarFuncionario() {
    this.funcionarioService.cadastrarFuncionario(this.funcionario).subscribe({
      complete: () => {
        this.notifyService.notify('Novo funcionário cadastrado no cargo!  Gostaria de adicionar uma foto ao funcionário?');
        this.funcionarioService.buscarFuncionarioPeloNome(this.funcionario.func_nome)
          .subscribe(res => {
            console.log(res)
            this.idFuncionarioCadastrado = res.id_funcionario
            this.funcionarioCadastrado = true
          })
      },
      error: () => {
        this.notifyService.notify('Erro ao cadastrar funcionário!');
      },
      next: () => { console.log("Funcionário cadastrado com sucesso") }
    });
  }

  mostrarCargosParaAtribuicao() {
    this.cargoService.mostrarTodosCargos().subscribe(resultado => {
      this.cargos = resultado
    })
  }

  subirFoto(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      const formData = new FormData
      formData.append("foto", this.foto)

      const nome: string = this.funcionario.func_nome + "-" + event.target.files[0].name

      //http://localhost:8080/empresa/envio/foto/funcionario/2?nome=bischmitt
      this.httpClient.post(`http://localhost:8080/empresa/envio/foto/funcionario/${this.idFuncionarioCadastrado}?nome=${nome}`, formData).subscribe({
        next: () => console.log("Foto enviada")
      })

      this.notifyService.notify("Foto anexada ao Supervisor!")
      this.location.back();
    }
  }

  escolherCargo() {
    console.log(this.cargoEscolhido)
  }
}
