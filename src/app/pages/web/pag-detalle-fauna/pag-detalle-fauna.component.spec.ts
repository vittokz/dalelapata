import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagDetalleFaunaComponent } from './pag-detalle-fauna.component';

describe('PagDetalleFaunaComponent', () => {
  let component: PagDetalleFaunaComponent;
  let fixture: ComponentFixture<PagDetalleFaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagDetalleFaunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagDetalleFaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
