import { NotifyService } from '../../../../services/notify.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cargo } from 'src/app/models/cargoModel';
import { CargoService } from 'src/app/services/cargo.service';

@Component({
  selector: 'app-exclusao-cargo',
  templateUrl: './exclusao-cargo.component.html',
  styleUrls: ['./exclusao-cargo.component.sass'],
})
export class ExclusaoCargoComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.cargo.id_cargo = this.route.snapshot.paramMap.get('id');
    this.mostrarUmCargo();
  }

  mostrarUmCargo() {
    this.cargoService
      .mostrarUmCargo(this.cargo.id_cargo)
      .subscribe((resultado) => {
        this.cargo = resultado;
        console.log(this.cargo);
      });
  }

  excluirCargo() {
    this.cargoService.excluirCargo(this.cargo.id_cargo).subscribe({
      complete: () => this.notifyService.notify('Cargo excluído com sucesso!'),
      error: () =>
        this.notifyService.notify('Este cargo possui funcionários associados e não pode ser excluído!'),
    });
    this.router.navigate(['/cargos']);
  }
}
