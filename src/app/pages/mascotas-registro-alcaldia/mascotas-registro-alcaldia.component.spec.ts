import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasRegistroAlcaldiaComponent } from './mascotas-registro-alcaldia.component';

describe('MascotasRegistroAlcaldiaComponent', () => {
  let component: MascotasRegistroAlcaldiaComponent;
  let fixture: ComponentFixture<MascotasRegistroAlcaldiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasRegistroAlcaldiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasRegistroAlcaldiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
