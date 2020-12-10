import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExtraviadasComponent } from './lista-extraviadas.component';

describe('ListaExtraviadasComponent', () => {
  let component: ListaExtraviadasComponent;
  let fixture: ComponentFixture<ListaExtraviadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaExtraviadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExtraviadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
