import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargoModel';
import { Supervisor } from '../models/supervisorModel';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {

  baseUrl: string = 'http://localhost:8080/empresa';

  constructor(private httpClient: HttpClient) { }

  buscarUmSupervisor(id_supervisor: string): Observable<Supervisor> {
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.httpClient.get<Supervisor>(url)
  }

  buscarSupervisorCargo(id_cargo: string): Observable<Supervisor> {
    const url = `${this.baseUrl}/supervisor-cargo/${id_cargo}`
    return this.httpClient.get<Supervisor>(url)
  }

  buscarSupervisoresSemCargo(): Observable<Supervisor[]> {
    const url = `${this.baseUrl}/supervisorSemCargo`
    return this.httpClient.get<Supervisor[]>(url)
  }

  buscarSupervisorPeloNome(spvisor_nome: string): Observable<Supervisor> {
    const url = `${this.baseUrl}/supervisor-nome/${spvisor_nome}`
    return this.httpClient.get<Supervisor>(url)
  }

  buscarTodosSupervisores(): Observable<any> {
    const url = `${this.baseUrl}/supervisor/supervisor-cargo`
    return this.httpClient.get<any>(url)
  }

  cadastrarSupervisor(supervisor: Supervisor): Observable<Supervisor> {
    const url = `${this.baseUrl}/supervisor`
    return this.httpClient.post<Supervisor>(url, supervisor)
  }

  excluirSupervisor(id_supervisor: string): Observable<void> {
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.httpClient.delete<void>(url)
  }

  editarSupervisor(supervisor: Supervisor, id_supervisor: string): Observable<Supervisor> {
    //localhost:8080/empresa/supervisor/5?cargo=13
    const url = `${this.baseUrl}/supervisor/${id_supervisor}`
    return this.httpClient.put<Supervisor>(url, supervisor)
  }
}
