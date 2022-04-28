import { NgModule } from '@angular/core';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Erro404Component } from './erro404/erro404.component';
import { LoaderComponent } from '../components/loader/loader.component';
// import { LoaderInterceptorService } from './loader-interceptor/loader-interceptor.service';
@NgModule({
  declarations: [
    //Erro404Component,
    // LoaderComponent
  ],
  imports: [
    RouterModule.forChild([
      //{ path: '**', component:Erro404Component},
    ]),

  ],
  exports: [],
  // providers:[
  //   { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
  // ]
})
export class CoreModule {}
