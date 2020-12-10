import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasListAlcaldiaComponent } from './mascotas-list-alcaldia.component';

describe('MascotasListAlcaldiaComponent', () => {
  let component: MascotasListAlcaldiaComponent;
  let fixture: ComponentFixture<MascotasListAlcaldiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasListAlcaldiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasListAlcaldiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
