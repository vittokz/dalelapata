import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaAdminDetalleComponent } from './convocatoria-admin-detalle.component';

describe('ConvocatoriaAdminDetalleComponent', () => {
  let component: ConvocatoriaAdminDetalleComponent;
  let fixture: ComponentFixture<ConvocatoriaAdminDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaAdminDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaAdminDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
