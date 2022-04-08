import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';
import { NotifyService } from 'src/app/services/notify.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cadastro-cargo',
  templateUrl: './cadastro-cargo.component.html',
  styleUrls: ['./cadastro-cargo.component.sass'],
})
export class CadastroCargoComponent implements OnInit {

  cargo: Cargo = {
    car_nome: '',
    car_atribuicao: '',
  };

  constructor(
    private cargoService: CargoService,
    private router: Router,
    public notifyService: NotifyService) { }

  ngOnInit(): void { }

  cadastrarCargo() {
    this.cargoService.cadastrarCargo(this.cargo).subscribe({
      complete: () => {
        this.notifyService.notify('Cargo cadastrado com sucesso!')
        this.router.navigate(['/cargos']);
      },
      error: () => {
        this.notifyService.notify("Erro ao cadastrar cargo!")
      },
      next: () => { console.log("Cargo cadastrado com sucesso!") }
    })
  }
}
