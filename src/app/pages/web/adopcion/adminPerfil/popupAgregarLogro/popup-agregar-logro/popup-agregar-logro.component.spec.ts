import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAgregarLogroComponent } from './popup-agregar-logro.component';

describe('PopupAgregarLogroComponent', () => {
  let component: PopupAgregarLogroComponent;
  let fixture: ComponentFixture<PopupAgregarLogroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupAgregarLogroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupAgregarLogroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
