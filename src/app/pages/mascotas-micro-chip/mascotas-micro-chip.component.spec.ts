import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasMicroChipComponent } from './mascotas-micro-chip.component';

describe('MascotasMicroChipComponent', () => {
  let component: MascotasMicroChipComponent;
  let fixture: ComponentFixture<MascotasMicroChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MascotasMicroChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasMicroChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
