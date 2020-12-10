import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasPorAdoptarAdminComponent } from './mascotas-por-adoptar-admin.component';

describe('MascotasPorAdoptarAdminComponent', () => {
  let component: MascotasPorAdoptarAdminComponent;
  let fixture: ComponentFixture<MascotasPorAdoptarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasPorAdoptarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasPorAdoptarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
