import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilAdminImgComponent } from './unidad-movil-admin-img.component';

describe('UnidadMovilAdminImgComponent', () => {
  let component: UnidadMovilAdminImgComponent;
  let fixture: ComponentFixture<UnidadMovilAdminImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilAdminImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilAdminImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
