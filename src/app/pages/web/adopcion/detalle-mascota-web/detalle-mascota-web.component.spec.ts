import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMascotaWebComponent } from './detalle-mascota-web.component';

describe('DetalleMascotaWebComponent', () => {
  let component: DetalleMascotaWebComponent;
  let fixture: ComponentFixture<DetalleMascotaWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMascotaWebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMascotaWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
