import { TestBed } from '@angular/core/testing';

import { Conjuntoservice } from './conjuntoservice';

describe('Conjuntoservice', () => {
  let service: Conjuntoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conjuntoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
