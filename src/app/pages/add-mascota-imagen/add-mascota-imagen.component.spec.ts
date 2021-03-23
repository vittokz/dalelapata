import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMascotaImagenComponent } from './add-mascota-imagen.component';

describe('AddMascotaImagenComponent', () => {
  let component: AddMascotaImagenComponent;
  let fixture: ComponentFixture<AddMascotaImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMascotaImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMascotaImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
