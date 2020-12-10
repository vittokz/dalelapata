import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagEventosComponent } from './pag-eventos.component';

describe('PagEventosComponent', () => {
  let component: PagEventosComponent;
  let fixture: ComponentFixture<PagEventosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagEventosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
