import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cargo } from '../models/cargoModel';

@Injectable({
  providedIn: 'root'
})

/* Conexão com o backend Java */
export class CargoService {
  baseUrl: string = 'http://localhost:8080/empresa';

  constructor(private http: HttpClient) { }

  // Mostrar todos os cargos
  mostrarTodosCargos(): Observable<Cargo[]> {
    const url = `${this.baseUrl}/cargo`;
    return this.http.get<Cargo[]>(url);
  }

  // Mostrar os cargos sem supervisor
  mostrarCargosSemSupervisor(): Observable<Cargo[]> {
    const url = `${this.baseUrl}/cargoSemSupervisor`
    return this.http.get<Cargo[]>(url)
  }

  // Mostra um cargo
  mostrarUmCargo(id: string): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.get<Cargo>(url);
  }

  // Busca o cargo do supervisor
  buscarCargoDoSupervisor(id_supervisor: string): Observable<Cargo> {
    //http://localhost:8080/escola/cargo/cargo-supervisor/1
    const url = `${this.baseUrl}/cargo/cargo-supervisor/${id_supervisor}`
    return this.http.get<Cargo>(url)
  }

  // Busca todos os cargos
  buscarTodosCargos(): Observable<any> {
    const url = `${this.baseUrl}/cargo/cargo-supervisor`
    return this.http.get<any>(url)
  }

  // Cadastra um novo cargo
  cadastrarCargo(cargo: Cargo): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo`;
    return this.http.post<Cargo>(url, cargo);
  }

  // É do tipo void porque não tem retorno.
  excluirCargo(id: string): Observable<void> {
    const url = `${this.baseUrl}/cargo/${id}`;
    return this.http.delete<void>(url);
  }

  // É do tipo void porque não tem retorno, mas não fará diferença se utilizar cargo
  editarCargo(cargo: Cargo): Observable<Cargo> {
    const url = `${this.baseUrl}/cargo/${cargo.id_cargo}`;
    return this.http.put<Cargo>(url, cargo);
  }

  // Atribui supervisor a um cargo
  atribuirSupervisor(cargo: Cargo, id_cargo: string, id_supervisor: string): Observable<void> {
    const url = `${this.baseUrl}/cargo/definirSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo);
  }

  // Deixa um cargo sem supervisor
  deixarCargoSemSupervisor(cargo: Cargo, id_cargo: string, id_supervisor: string): Observable<void> {
    //http://localhost:8080/empresa/cargo/tirarSupervisor/3/2
    const url = `${this.baseUrl}/cargo/tirarSupervisor/${id_cargo}/${id_supervisor}`
    return this.http.put<void>(url, cargo);
  }
}
