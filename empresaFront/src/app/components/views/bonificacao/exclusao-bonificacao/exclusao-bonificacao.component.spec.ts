import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoBonificacaoComponent } from './exclusao-bonificacao.component';

describe('ExclusaoBonificacaoComponent', () => {
  let component: ExclusaoBonificacaoComponent;
  let fixture: ComponentFixture<ExclusaoBonificacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoBonificacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoBonificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
