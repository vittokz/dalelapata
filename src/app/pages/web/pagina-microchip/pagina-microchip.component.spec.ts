import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMicrochipComponent } from './pagina-microchip.component';

describe('PaginaMicrochipComponent', () => {
  let component: PaginaMicrochipComponent;
  let fixture: ComponentFixture<PaginaMicrochipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMicrochipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMicrochipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
