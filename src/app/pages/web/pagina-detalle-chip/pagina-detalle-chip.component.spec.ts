import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDetalleChipComponent } from './pagina-detalle-chip.component';

describe('PaginaDetalleChipComponent', () => {
  let component: PaginaDetalleChipComponent;
  let fixture: ComponentFixture<PaginaDetalleChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDetalleChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDetalleChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
