import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasMicrochipComponent } from './mascotas-microchip.component';

describe('MascotasMicrochipComponent', () => {
  let component: MascotasMicrochipComponent;
  let fixture: ComponentFixture<MascotasMicrochipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasMicrochipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasMicrochipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
