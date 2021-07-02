import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsulasComponent } from './capsulas.component';

describe('CapsulasComponent', () => {
  let component: CapsulasComponent;
  let fixture: ComponentFixture<CapsulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapsulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
