import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasExtraviadasAdminComponent } from './mascotas-extraviadas-admin.component';

describe('MascotasExtraviadasAdminComponent', () => {
  let component: MascotasExtraviadasAdminComponent;
  let fixture: ComponentFixture<MascotasExtraviadasAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasExtraviadasAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasExtraviadasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
