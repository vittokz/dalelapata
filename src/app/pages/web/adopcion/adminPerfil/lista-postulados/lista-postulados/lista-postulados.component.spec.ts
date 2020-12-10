import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPostuladosComponent } from './lista-postulados.component';

describe('ListaPostuladosComponent', () => {
  let component: ListaPostuladosComponent;
  let fixture: ComponentFixture<ListaPostuladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPostuladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPostuladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
