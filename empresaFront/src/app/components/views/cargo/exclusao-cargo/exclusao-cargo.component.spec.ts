import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusaoCargoComponent } from './exclusao-cargo.component';

describe('ExclusaoCargoComponent', () => {
  let component: ExclusaoCargoComponent;
  let fixture: ComponentFixture<ExclusaoCargoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusaoCargoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusaoCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
