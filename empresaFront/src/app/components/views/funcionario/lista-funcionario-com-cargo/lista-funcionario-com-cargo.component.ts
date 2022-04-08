import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista-funcionario-com-cargo',
  templateUrl: './lista-funcionario-com-cargo.component.html',
  styleUrls: ['./lista-funcionario-com-cargo.component.sass']
})
export class ListaFuncionarioComCargoComponent implements OnInit {

  funcionarios: any = []

  /*   displayedColumns = ['id_funcionario', 'func_nome', 'func_cidade', 'car_nome', 'car_atribuicao', 'id_cargo']; */

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.buscarTodosFuncionarios()
  }

  buscarTodosFuncionarios() {
    this.funcionarioService.buscarTodosFuncionarios().subscribe(resultado => {

      console.log(resultado)

      resultado.forEach((funcionario: any[]) => {

        let funcionariosComCargo: any = {
          id_funcionario: '',
          func_nome: '',
          func_cidade: '',
          func_foto: undefined,
          id_cargo: '',
          car_nome: '',
          car_atribuicao: ''
        }

        funcionariosComCargo.id_funcionario = funcionario[0]
        funcionariosComCargo.func_nome = funcionario[1]
        funcionariosComCargo.func_cidade = funcionario[2]
        funcionariosComCargo.func_foto = funcionario[3]
        if (funcionario[4] != null) {
          funcionariosComCargo.id_cargo = funcionario[4]
          funcionariosComCargo.car_nome = funcionario[5]
          funcionariosComCargo.car_atribuicao = funcionario[6]
        } else {
          funcionariosComCargo.id_cargo = 0
          funcionariosComCargo.car_nome = "----"
          funcionariosComCargo.car_atribuicao = "----"
        }
        this.funcionarios.push(funcionariosComCargo)
      });
    })
  }
}
