import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasExtraviadasPerfilComponent } from './mascotas-extraviadas-perfil.component';

describe('MascotasExtraviadasPerfilComponent', () => {
  let component: MascotasExtraviadasPerfilComponent;
  let fixture: ComponentFixture<MascotasExtraviadasPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasExtraviadasPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasExtraviadasPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
