import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargoModel';
import { Funcionario } from '../models/funcionarioModel';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  /* Fazendo a conexão com o banco de dados */
  baseUrl: string = 'http://localhost:8080/empresa';

  constructor(private httpClient: HttpClient) { }

  /* Buscar todos os funcionários */
  buscarTodosFuncionarios(): Observable<any[]> {
    const url = `${this.baseUrl}/funcionario-cargo`
    return this.httpClient.get<any[]>(url)
  }

  /* Serviço para buscar funcionários de acordo com o cargo */
  buscarFuncionariosCargo(id_cargo: string): Observable<Funcionario[]> {
    const url = `${this.baseUrl}/funcionario/busca-cargo/${id_cargo}`;
    return this.httpClient.get<Funcionario[]>(url);
  }

  /* Serviço para buscar um funcionário */
  buscarUmFuncionario(id_funcionario: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`;
    return this.httpClient.get<Funcionario>(url);
  }

  buscarFuncionarioPeloNome(spvisor_nome: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario-nome/${spvisor_nome}`
    return this.httpClient.get<Funcionario>(url)
  }

  // /* Serviço para cadastrar Funcionário */
  // cadastrarFuncionario(funcionario: Funcionario, id_cargo: string): Observable<Funcionario> {
  //   // Sempre observar no controller do Java os parâmetros que devem ser passados aqui
  //   const url = `${this.baseUrl}/funcionario?cargo=${id_cargo}`;
  //   // Essa url tem que ser igual à do postman
  //   return this.httpClient.post<Funcionario>(url, funcionario);
  // }

  /* Serviço para cadastrar Funcionário */
  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    // Sempre observar no controller do Java os parâmetros que devem ser passados aqui
    const url = `${this.baseUrl}/funcionario`;
    // Essa url tem que ser igual à do postman
    return this.httpClient.post<Funcionario>(url, funcionario);
  }

  /* Serviço para excluir um funcionário */
  excluirFuncionario(id_funcionario: string): Observable<void> {
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`;
    return this.httpClient.delete<void>(url);
  }

  /* Serviço para editar um funcionário */
  /* editarFuncionario(funcionario: Funcionario, id_funcionario: string, id_cargo: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario/${id_funcionario}?cargo=${id_cargo}`
    return this.httpClient.put<Funcionario>(url, funcionario)
  } */

  /* Serviço para editar um funcionário */
  editarFuncionario(funcionario: Funcionario, id_funcionario: string): Observable<Funcionario> {
    const url = `${this.baseUrl}/funcionario/${id_funcionario}`
    return this.httpClient.put<Funcionario>(url, funcionario)
  }

  atribuirCargo(cargo: Cargo, id_funcionario: string): Observable<Funcionario> {
    //http://localhost:8080/empresa/funcionario/inserirCargo/8
    const url = `${this.baseUrl}/funcionario/inserirCargo/${id_funcionario}`
    return this.httpClient.put<Funcionario>(url, cargo)
  }

  deixarFuncionarioSemCargo(funcionario: Funcionario, id_funcionario: string): Observable<Funcionario> {
    //http://localhost:8080/empresa/funcionario/deixarSemCargo/4
    const url = `${this.baseUrl}/funcionario/deixarSemCargo/${id_funcionario}`
    return this.httpClient.put<Funcionario>(url, funcionario)
  }
}
