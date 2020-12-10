import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasEncontradasPerfilComponent } from './mascotas-encontradas-perfil.component';

describe('MascotasEncontradasPerfilComponent', () => {
  let component: MascotasEncontradasPerfilComponent;
  let fixture: ComponentFixture<MascotasEncontradasPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasEncontradasPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasEncontradasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
