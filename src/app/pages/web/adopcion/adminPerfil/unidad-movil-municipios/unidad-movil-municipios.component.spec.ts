import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilMunicipiosComponent } from './unidad-movil-municipios.component';

describe('UnidadMovilMunicipiosComponent', () => {
  let component: UnidadMovilMunicipiosComponent;
  let fixture: ComponentFixture<UnidadMovilMunicipiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilMunicipiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilMunicipiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
