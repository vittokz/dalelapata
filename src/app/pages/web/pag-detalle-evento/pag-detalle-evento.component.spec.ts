import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagDetalleEventoComponent } from './pag-detalle-evento.component';

describe('PagDetalleEventoComponent', () => {
  let component: PagDetalleEventoComponent;
  let fixture: ComponentFixture<PagDetalleEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagDetalleEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagDetalleEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
