import { TestBed } from '@angular/core/testing';

import { TipoFundacionService } from './tipo-fundacion.service';

describe('TipoFundacionService', () => {
  let service: TipoFundacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoFundacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
