import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleFundacionComponent } from './detalle-fundacion.component';

describe('DetalleFundacionComponent', () => {
  let component: DetalleFundacionComponent;
  let fixture: ComponentFixture<DetalleFundacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleFundacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleFundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
