import { TestBed } from '@angular/core/testing';
import { Sesionservice } from './sesionservice';

describe('Sesionservice', () => {
  let service: Sesionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sesionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
