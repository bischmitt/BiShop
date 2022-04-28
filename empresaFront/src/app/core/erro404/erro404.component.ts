import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-erro404',
  templateUrl: './erro404.component.html',
  styleUrls: ['./erro404.component.sass']
})
export class Erro404Component implements OnInit {

  constructor(
    public notifyService: NotifyService
  ) { }

  ngOnInit(): void {
    this.notifyService.notify('Página não encontrada!')
  }

}
