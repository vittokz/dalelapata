import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMascotaPropietarioComponent } from './add-mascota-propietario.component';

describe('AddMascotaPropietarioComponent', () => {
  let component: AddMascotaPropietarioComponent;
  let fixture: ComponentFixture<AddMascotaPropietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMascotaPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMascotaPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
