import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilAdminComponent } from './unidad-movil-admin.component';

describe('UnidadMovilAdminComponent', () => {
  let component: UnidadMovilAdminComponent;
  let fixture: ComponentFixture<UnidadMovilAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
