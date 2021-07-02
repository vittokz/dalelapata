import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCapsulasComponent } from './lista-capsulas.component';

describe('ListaCapsulasComponent', () => {
  let component: ListaCapsulasComponent;
  let fixture: ComponentFixture<ListaCapsulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCapsulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCapsulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
