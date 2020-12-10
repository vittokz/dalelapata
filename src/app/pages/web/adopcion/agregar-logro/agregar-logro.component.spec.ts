import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLogroComponent } from './agregar-logro.component';

describe('AgregarLogroComponent', () => {
  let component: AgregarLogroComponent;
  let fixture: ComponentFixture<AgregarLogroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarLogroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarLogroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
