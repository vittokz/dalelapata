import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVerLogrosComponent } from './popup-ver-logros.component';

describe('PopupVerLogrosComponent', () => {
  let component: PopupVerLogrosComponent;
  let fixture: ComponentFixture<PopupVerLogrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupVerLogrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVerLogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
