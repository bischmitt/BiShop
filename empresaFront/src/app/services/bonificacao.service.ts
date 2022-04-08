import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bonificacao } from '../models/bonificacaoModel';

@Injectable({
  providedIn: 'root'
})
export class BonificacaoService {

  baseUrl: string = 'http://localhost:8080/empresa'

  constructor(private http: HttpClient) { }

  buscarUmaBonificacao(codigo: string): Observable<Bonificacao> {
    //http://localhost:8080/empresa/funcionario/bonificacao/1
    const url = `${this.baseUrl}/funcionario/bonificacao/${codigo}`
    return this.http.get<Bonificacao>(url)
  }

  listarBonificacoesDoFuncionario(id_funcionario: string): Observable<Bonificacao[]> {
    //http://localhost:8080/empresa/funcionario/bonificacoesDoFuncionario/1
    const url = `${this.baseUrl}/funcionario/bonificacoesDoFuncionario/${id_funcionario}`
    return this.http.get<Bonificacao[]>(url)
  }

  cadastrarBonificacao(bonificacao: Bonificacao, id_funcionario: string): Observable<Bonificacao> {
  /*   /funcionario/bonificacao/{id_funcionario */
    const url = `${this.baseUrl}/funcionario/bonificacao/${id_funcionario}`
    return this.http.post<Bonificacao>(url, bonificacao);
  }

  editarBonificacao(bonificacao: Bonificacao, codigo: any, id_funcionario: any): Observable<Bonificacao> {
    const url = `${this.baseUrl}/funcionario/bonificacao/${codigo}/${id_funcionario}`
    return this.http.put<Bonificacao>(url, bonificacao)
  }

  excluirBonificacao(codigo: string): Observable<void> {
    const url = `${this.baseUrl}/funcionario/bonificacao/${codigo}`
    return this.http.delete<void>(url)
  }

  quitarBonificacao(bonificacao: Bonificacao, codigo: any): Observable<Bonificacao> {
    //http://localhost:8080/empresa/funcionario/QuitarBonificacao/5
    const url = `${this.baseUrl}/funcionario/quitarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(url, bonificacao)
  }

  cancelarBonificacao(bonificacao: Bonificacao, codigo: any): Observable<Bonificacao> {
    //http://localhost:8080/empresa/funcionario/cancelarBonificacao/5
    const url = `${this.baseUrl}/funcionario/cancelarBonificacao/${codigo}`
    return this.http.put<Bonificacao>(url, bonificacao)
  }
}
