import { TestBed } from '@angular/core/testing';

import { UserPlataformaService } from './user-plataforma.service';

describe('UserPlataformaService', () => {
  let service: UserPlataformaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPlataformaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
