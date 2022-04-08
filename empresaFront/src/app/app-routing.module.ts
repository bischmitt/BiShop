import { ListaBonificacaoFuncionariosComponent } from './components/views/bonificacao/lista-bonificacao-funcionarios/lista-bonificacao-funcionarios.component';
import { ExclusaoSupervisorComponent } from './components/views/supervisor/exclusao-supervisor/exclusao-supervisor.component';
import { AtribuirCargoSupervisorComponent } from './components/views/supervisor/atribuir-cargo-supervisor/atribuir-cargo-supervisor.component';
import { CadastrarSupervisorComponent } from './components/views/supervisor/cadastrar-supervisor/cadastrar-supervisor.component';
import { AtribuirCargoFuncionarioComponent } from './components/views/funcionario/atribuir-cargo-funcionario/atribuir-cargo-funcionario.component';
import { ListaFuncionariosDoCargoComponent } from './components/views/funcionario/lista-funcionarios-do-cargo/lista-funcionarios-do-cargo.component';
import { ListaFuncionarioComCargoComponent } from './components/views/funcionario/lista-funcionario-com-cargo/lista-funcionario-com-cargo.component';
import { SupervisorCargoComponent } from './components/views/supervisor/supervisor-cargo/supervisor-cargo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroCargoComponent } from './components/views/cargo/cadastro-cargo/cadastro-cargo.component';
import { CadastroFuncionarioComponent } from './components/views/funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { EdicaoCargoComponent } from './components/views/cargo/edicao-cargo/edicao-cargo.component';
import { EdicaoFuncionarioComponent } from './components/views/funcionario/edicao-funcionario/edicao-funcionario.component';
import { ExclusaoCargoComponent } from './components/views/cargo/exclusao-cargo/exclusao-cargo.component';
import { ExclusaoFuncionarioComponent } from './components/views/funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { HomeComponent } from './components/home/home.component';
import { ListaCargoComponent } from './components/views/cargo/lista-cargo/lista-cargo.component';
import { ListaSupervisoresComponent } from './components/views/supervisor/lista-supervisores/lista-supervisores.component';
import { EdicaoSupervisorComponent } from './components/views/supervisor/edicao-supervisor/edicao-supervisor.component';
import { CadastrarBonificacaoComponent } from './components/views/bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { EdicaoBonificacaoComponent } from './components/views/bonificacao/edicao-bonificacao/edicao-bonificacao.component';
import { ExclusaoBonificacaoComponent } from './components/views/bonificacao/exclusao-bonificacao/exclusao-bonificacao.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cargos', component: ListaCargoComponent },
  { path: 'cargo/cadastro', component: CadastroCargoComponent },
  { path: 'cargo/exclusao/:id', component: ExclusaoCargoComponent },
  { path: 'cargo/edicao/:id', component: EdicaoCargoComponent },
  { path: 'cargo/:id_cargo/funcionario/cadastro', component: CadastroFuncionarioComponent },
  { path: 'funcionario/cadastro', component: CadastroFuncionarioComponent },
  { path: 'funcionario/exclusao/:id_funcionario', component: ExclusaoFuncionarioComponent },
  { path: 'funcionario/edicao/:id_funcionario', component: EdicaoFuncionarioComponent },
  { path: 'funcionario/atribuirCargo/:id_funcionario/:id_cargo', component: AtribuirCargoFuncionarioComponent },
  { path: 'funcionarios/comCargo', component: ListaFuncionarioComCargoComponent },
  { path: 'funcionarios/listaDoCargo/:id_cargo', component: ListaFuncionariosDoCargoComponent },
  { path: 'supervisores', component: ListaSupervisoresComponent },
  { path: 'supervisor/cadastro', component: CadastrarSupervisorComponent },
  { path: 'supervisor/supervisorDoCargo/:id_cargo', component: SupervisorCargoComponent },
  { path: 'supervisor/atribuirCargo/:id_supervisor', component: AtribuirCargoSupervisorComponent },
  { path: 'supervisor/exclusao/:id_supervisor', component: ExclusaoSupervisorComponent },
  { path: 'supervisor/edicao/:id_supervisor', component: EdicaoSupervisorComponent },
  { path: 'bonificacao/cadastro/:id_funcionario', component: CadastrarBonificacaoComponent },
  { path: 'bonificacao/funcionario/:id_funcionario', component: ListaBonificacaoFuncionariosComponent },
  { path: 'bonificacao/exclusao/:codigo/:id_funcionario', component: ExclusaoBonificacaoComponent },
  { path: 'bonificacao/edicao/:codigo/:id_funcionario', component: EdicaoBonificacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
