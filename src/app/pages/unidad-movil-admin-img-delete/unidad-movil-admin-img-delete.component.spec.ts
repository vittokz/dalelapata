import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilAdminImgDeleteComponent } from './unidad-movil-admin-img-delete.component';

describe('UnidadMovilAdminImgDeleteComponent', () => {
  let component: UnidadMovilAdminImgDeleteComponent;
  let fixture: ComponentFixture<UnidadMovilAdminImgDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilAdminImgDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilAdminImgDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
