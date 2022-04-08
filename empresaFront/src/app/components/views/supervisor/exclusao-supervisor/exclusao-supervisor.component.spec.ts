import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoSupervisorComponent } from './exclusao-supervisor.component';

describe('ExclusaoSupervisorComponent', () => {
  let component: ExclusaoSupervisorComponent;
  let fixture: ComponentFixture<ExclusaoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
