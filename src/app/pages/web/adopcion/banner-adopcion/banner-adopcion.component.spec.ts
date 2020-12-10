import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAdopcionComponent } from './banner-adopcion.component';

describe('BannerAdopcionComponent', () => {
  let component: BannerAdopcionComponent;
  let fixture: ComponentFixture<BannerAdopcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerAdopcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
