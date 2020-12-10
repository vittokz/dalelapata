import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasEncontradasAdminComponent } from './mascotas-encontradas-admin.component';

describe('MascotasEncontradasAdminComponent', () => {
  let component: MascotasEncontradasAdminComponent;
  let fixture: ComponentFixture<MascotasEncontradasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasEncontradasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasEncontradasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
