import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFundacionComponent } from './registrar-fundacion.component';

describe('RegistrarFundacionComponent', () => {
  let component: RegistrarFundacionComponent;
  let fixture: ComponentFixture<RegistrarFundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarFundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarFundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
