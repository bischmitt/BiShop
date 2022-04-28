import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Erro404Component } from './erro404/erro404.component';

@NgModule({
  declarations: [
    Erro404Component
  ],
  imports: [
    RouterModule.forChild([
      { path: '**', component:Erro404Component}
    ]),

  ],
  exports: [],
})
export class CoreModule {}
