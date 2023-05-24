import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaAdminComponent } from './convocatoria-admin.component';

describe('ConvocatoriaAdminComponent', () => {
  let component: ConvocatoriaAdminComponent;
  let fixture: ComponentFixture<ConvocatoriaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
