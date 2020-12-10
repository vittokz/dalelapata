import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaunaSilvestreComponent } from './fauna-silvestre.component';

describe('FaunaSilvestreComponent', () => {
  let component: FaunaSilvestreComponent;
  let fixture: ComponentFixture<FaunaSilvestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaunaSilvestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaunaSilvestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
