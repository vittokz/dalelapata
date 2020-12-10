import { TestBed } from '@angular/core/testing';

import { VisitasMovilService } from './visitas-movil.service';

describe('VisitasMovilService', () => {
  let service: VisitasMovilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitasMovilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
