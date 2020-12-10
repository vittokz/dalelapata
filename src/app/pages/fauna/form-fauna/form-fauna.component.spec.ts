import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFaunaComponent } from './form-fauna.component';

describe('FormFaunaComponent', () => {
  let component: FormFaunaComponent;
  let fixture: ComponentFixture<FormFaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFaunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
