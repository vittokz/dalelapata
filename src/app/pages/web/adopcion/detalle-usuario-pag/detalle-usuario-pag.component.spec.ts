import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUsuarioPagComponent } from './detalle-usuario-pag.component';

describe('DetalleUsuarioPagComponent', () => {
  let component: DetalleUsuarioPagComponent;
  let fixture: ComponentFixture<DetalleUsuarioPagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUsuarioPagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUsuarioPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
