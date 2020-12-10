import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregraLogroAdminComponent } from './agregra-logro-admin.component';

describe('AgregraLogroAdminComponent', () => {
  let component: AgregraLogroAdminComponent;
  let fixture: ComponentFixture<AgregraLogroAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregraLogroAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregraLogroAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
