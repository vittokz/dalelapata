import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEsterilizadasComponent } from './lista-esterilizadas.component';

describe('ListaEsterilizadasComponent', () => {
  let component: ListaEsterilizadasComponent;
  let fixture: ComponentFixture<ListaEsterilizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEsterilizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEsterilizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
