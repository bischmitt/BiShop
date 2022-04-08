import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirCargoFuncionarioComponent } from './atribuir-cargo-funcionario.component';

describe('AtribuirCargoFuncionarioComponent', () => {
  let component: AtribuirCargoFuncionarioComponent;
  let fixture: ComponentFixture<AtribuirCargoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtribuirCargoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirCargoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
