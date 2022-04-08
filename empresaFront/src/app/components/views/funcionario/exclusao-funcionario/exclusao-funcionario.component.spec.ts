import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoFuncionarioComponent } from './exclusao-funcionario.component';

describe('ExclusaoFuncionarioComponent', () => {
  let component: ExclusaoFuncionarioComponent;
  let fixture: ComponentFixture<ExclusaoFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
