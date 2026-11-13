import { TestBed } from '@angular/core/testing';
import { Recomendacionservice } from './recomendacionservice';

describe('Recomendacionservice', () => {
  let service: Recomendacionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recomendacionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
