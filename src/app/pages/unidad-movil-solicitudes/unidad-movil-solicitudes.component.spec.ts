import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilSolicitudesComponent } from './unidad-movil-solicitudes.component';

describe('UnidadMovilSolicitudesComponent', () => {
  let component: UnidadMovilSolicitudesComponent;
  let fixture: ComponentFixture<UnidadMovilSolicitudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilSolicitudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
