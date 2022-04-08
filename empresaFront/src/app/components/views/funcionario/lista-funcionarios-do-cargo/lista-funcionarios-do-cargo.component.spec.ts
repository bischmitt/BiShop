import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncionariosDoCargoComponent } from './lista-funcionarios-do-cargo.component';

describe('ListaFuncionariosDoCargoComponent', () => {
  let component: ListaFuncionariosDoCargoComponent;
  let fixture: ComponentFixture<ListaFuncionariosDoCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFuncionariosDoCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFuncionariosDoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
