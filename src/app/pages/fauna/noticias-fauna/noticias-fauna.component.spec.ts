import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasFaunaComponent } from './noticias-fauna.component';

describe('NoticiasFaunaComponent', () => {
  let component: NoticiasFaunaComponent;
  let fixture: ComponentFixture<NoticiasFaunaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticiasFaunaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticiasFaunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
