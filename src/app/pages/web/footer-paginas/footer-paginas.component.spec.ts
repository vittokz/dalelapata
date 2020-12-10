import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPaginasComponent } from './footer-paginas.component';

describe('FooterPaginasComponent', () => {
  let component: FooterPaginasComponent;
  let fixture: ComponentFixture<FooterPaginasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterPaginasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
