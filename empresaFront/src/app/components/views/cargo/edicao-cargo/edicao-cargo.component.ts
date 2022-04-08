import { NotifyService } from '../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-edicao-cargo',
  templateUrl: './edicao-cargo.component.html',
  styleUrls: ['./edicao-cargo.component.sass'],
})
export class EdicaoCargoComponent implements OnInit {
  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: '',
  };

  constructor(
    private cargoService: CargoService,
    private route: ActivatedRoute,
    private router: Router,
    public notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id');
    this.mostrarUmCargo();
  }

  mostrarUmCargo() {
    this.cargoService
      .mostrarUmCargo(this.cargo.id_cargo)
      .subscribe((resultado) => {
        this.cargo = resultado;
      });
  }

  editarCargo() {
    this.cargoService.editarCargo(this.cargo).subscribe({
      complete: () => this.notifyService.notify('Cargo editado com sucesso!'),
      error: () => this.notifyService.notify('Erro ao editar cargo!'),
    });
    this.router.navigate(['/cargos']);
  }
}
