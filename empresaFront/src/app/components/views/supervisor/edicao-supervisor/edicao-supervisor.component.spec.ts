import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoSupervisorComponent } from './edicao-supervisor.component';

describe('EdicaoSupervisorComponent', () => {
  let component: EdicaoSupervisorComponent;
  let fixture: ComponentFixture<EdicaoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdicaoSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
