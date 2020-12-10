import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasEsterilizadasComponent } from './mascotas-esterilizadas.component';

describe('MascotasEsterilizadasComponent', () => {
  let component: MascotasEsterilizadasComponent;
  let fixture: ComponentFixture<MascotasEsterilizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasEsterilizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasEsterilizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
