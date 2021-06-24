import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPodCastComponent } from './admin-pod-cast.component';

describe('AdminPodCastComponent', () => {
  let component: AdminPodCastComponent;
  let fixture: ComponentFixture<AdminPodCastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPodCastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPodCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
