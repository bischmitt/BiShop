import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuirCargoSupervisorComponent } from './atribuir-cargo-supervisor.component';

describe('AtribuirCargoSupervisorComponent', () => {
  let component: AtribuirCargoSupervisorComponent;
  let fixture: ComponentFixture<AtribuirCargoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtribuirCargoSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtribuirCargoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
