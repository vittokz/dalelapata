import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilSolicitudesDetalleComponent } from './unidad-movil-solicitudes-detalle.component';

describe('UnidadMovilSolicitudesDetalleComponent', () => {
  let component: UnidadMovilSolicitudesDetalleComponent;
  let fixture: ComponentFixture<UnidadMovilSolicitudesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilSolicitudesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilSolicitudesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
