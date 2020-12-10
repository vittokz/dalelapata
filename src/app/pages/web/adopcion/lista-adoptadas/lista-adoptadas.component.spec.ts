import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdoptadasComponent } from './lista-adoptadas.component';

describe('ListaAdoptadasComponent', () => {
  let component: ListaAdoptadasComponent;
  let fixture: ComponentFixture<ListaAdoptadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAdoptadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAdoptadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
