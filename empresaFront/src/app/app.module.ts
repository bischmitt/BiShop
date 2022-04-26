import { AngularMaterialModule } from './shared/angular-material.module';

import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxCurrencyModule } from "ngx-currency";
import localePt from '@angular/common/locales/pt';
import {CurrencyPipe, registerLocaleData} from '@angular/common';
registerLocaleData(localePt)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCargoComponent } from './components/views/cargo/lista-cargo/lista-cargo.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { EdicaoCargoComponent } from './components/views/cargo/edicao-cargo/edicao-cargo.component';
import { ExclusaoCargoComponent } from './components/views/cargo/exclusao-cargo/exclusao-cargo.component';
import { CadastroCargoComponent } from './components/views/cargo/cadastro-cargo/cadastro-cargo.component';

import { ExclusaoFuncionarioComponent } from './components/views/funcionario/exclusao-funcionario/exclusao-funcionario.component';
import { EdicaoFuncionarioComponent } from './components/views/funcionario/edicao-funcionario/edicao-funcionario.component';
import { CadastroFuncionarioComponent } from './components/views/funcionario/cadastro-funcionario/cadastro-funcionario.component';
import { ListaSupervisoresComponent } from './components/views/supervisor/lista-supervisores/lista-supervisores.component';
import { SupervisorCargoComponent } from './components/views/supervisor/supervisor-cargo/supervisor-cargo.component';
import { AtribuirCargoFuncionarioComponent } from './components/views/funcionario/atribuir-cargo-funcionario/atribuir-cargo-funcionario.component';
import { ListaFuncionarioComCargoComponent } from './components/views/funcionario/lista-funcionario-com-cargo/lista-funcionario-com-cargo.component';
import { ListaFuncionariosDoCargoComponent } from './components/views/funcionario/lista-funcionarios-do-cargo/lista-funcionarios-do-cargo.component';
import { AtribuirCargoSupervisorComponent } from './components/views/supervisor/atribuir-cargo-supervisor/atribuir-cargo-supervisor.component';
import { CadastrarSupervisorComponent } from './components/views/supervisor/cadastrar-supervisor/cadastrar-supervisor.component';
import { ExclusaoSupervisorComponent } from './components/views/supervisor/exclusao-supervisor/exclusao-supervisor.component';
import { EdicaoSupervisorComponent } from './components/views/supervisor/edicao-supervisor/edicao-supervisor.component';
import { CadastrarBonificacaoComponent } from './components/views/bonificacao/cadastrar-bonificacao/cadastrar-bonificacao.component';
import { ListaBonificacaoFuncionariosComponent } from './components/views/bonificacao/lista-bonificacao-funcionarios/lista-bonificacao-funcionarios.component';
import { EdicaoBonificacaoComponent } from './components/views/bonificacao/edicao-bonificacao/edicao-bonificacao.component';
import { ExclusaoBonificacaoComponent } from './components/views/bonificacao/exclusao-bonificacao/exclusao-bonificacao.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaCargoComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EdicaoCargoComponent,
    ExclusaoCargoComponent,
    CadastroCargoComponent,
    ExclusaoFuncionarioComponent,
    EdicaoFuncionarioComponent,
    CadastroFuncionarioComponent,
    ListaSupervisoresComponent,
    SupervisorCargoComponent,
    AtribuirCargoFuncionarioComponent,
    ListaFuncionarioComCargoComponent,
    ListaFuncionariosDoCargoComponent,
    AtribuirCargoSupervisorComponent,
    CadastrarSupervisorComponent,
    ExclusaoSupervisorComponent,
    EdicaoSupervisorComponent,
    CadastrarBonificacaoComponent,
    ListaBonificacaoFuncionariosComponent,
    EdicaoBonificacaoComponent,
    ExclusaoBonificacaoComponent,

  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    NgxCurrencyModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt_BR' },
  { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
