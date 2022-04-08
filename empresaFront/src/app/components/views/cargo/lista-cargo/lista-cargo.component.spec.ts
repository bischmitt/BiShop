import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCargoComponent } from './lista-cargo.component';

describe('ListaCargoComponent', () => {
  let component: ListaCargoComponent;
  let fixture: ComponentFixture<ListaCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
