import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFuncionarioComCargoComponent } from './lista-funcionario-com-cargo.component';

describe('ListaFuncionarioComCargoComponent', () => {
  let component: ListaFuncionarioComCargoComponent;
  let fixture: ComponentFixture<ListaFuncionarioComCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFuncionarioComCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFuncionarioComCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
