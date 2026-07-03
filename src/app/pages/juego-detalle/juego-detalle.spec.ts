import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoDetalleComponent } from './juego-detalle';

describe('JuegoDetalleComponent', () => {
  let component: JuegoDetalleComponent;
  let fixture: ComponentFixture<JuegoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoDetalleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegoDetalleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
