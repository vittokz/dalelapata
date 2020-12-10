import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasPorAdoptarPerfilComponent } from './mascotas-por-adoptar-perfil.component';

describe('MascotasPorAdoptarPerfilComponent', () => {
  let component: MascotasPorAdoptarPerfilComponent;
  let fixture: ComponentFixture<MascotasPorAdoptarPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasPorAdoptarPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasPorAdoptarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
