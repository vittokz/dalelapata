import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPagComponent } from './perfil-pag.component';

describe('PerfilPagComponent', () => {
  let component: PerfilPagComponent;
  let fixture: ComponentFixture<PerfilPagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
