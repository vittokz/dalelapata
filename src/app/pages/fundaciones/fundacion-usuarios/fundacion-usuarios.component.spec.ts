import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundacionUsuariosComponent } from './fundacion-usuarios.component';

describe('FundacionUsuariosComponent', () => {
  let component: FundacionUsuariosComponent;
  let fixture: ComponentFixture<FundacionUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundacionUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundacionUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
