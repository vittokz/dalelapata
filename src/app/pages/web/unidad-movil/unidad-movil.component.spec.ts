import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMovilComponent } from './unidad-movil.component';

describe('UnidadMovilComponent', () => {
  let component: UnidadMovilComponent;
  let fixture: ComponentFixture<UnidadMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
