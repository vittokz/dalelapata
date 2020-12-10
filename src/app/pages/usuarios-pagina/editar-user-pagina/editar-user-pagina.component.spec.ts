import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUserPaginaComponent } from './editar-user-pagina.component';

describe('EditarUserPaginaComponent', () => {
  let component: EditarUserPaginaComponent;
  let fixture: ComponentFixture<EditarUserPaginaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUserPaginaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUserPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
