import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFundacionesComponent } from './listar-fundaciones.component';

describe('ListarFundacionesComponent', () => {
  let component: ListarFundacionesComponent;
  let fixture: ComponentFixture<ListarFundacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarFundacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFundacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
