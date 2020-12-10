import { TestBed } from '@angular/core/testing';

import { AuthUsuariosService } from './auth-usuarios.service';

describe('AuthUsuariosService', () => {
  let service: AuthUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});