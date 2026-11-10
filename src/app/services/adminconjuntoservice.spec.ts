import { TestBed } from '@angular/core/testing';
import { Adminconjuntoservice } from './adminconjuntoservice';

describe('Adminconjuntoservice', () => {
  let service: Adminconjuntoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminconjuntoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
