import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEncontradasComponent } from './lista-encontradas.component';

describe('ListaEncontradasComponent', () => {
  let component: ListaEncontradasComponent;
  let fixture: ComponentFixture<ListaEncontradasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaEncontradasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaEncontradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
