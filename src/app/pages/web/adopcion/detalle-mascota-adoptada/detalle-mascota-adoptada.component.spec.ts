import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMascotaAdoptadaComponent } from './detalle-mascota-adoptada.component';

describe('DetalleMascotaAdoptadaComponent', () => {
  let component: DetalleMascotaAdoptadaComponent;
  let fixture: ComponentFixture<DetalleMascotaAdoptadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMascotaAdoptadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMascotaAdoptadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
