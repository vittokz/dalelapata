import { TestBed } from '@angular/core/testing';

import { PodcatsService } from './podcats.service';

describe('PodcatsService', () => {
  let service: PodcatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PodcatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
