import { TestBed } from '@angular/core/testing';
import { Ubicacionservice } from './ubicacionservice';

describe('Ubicacionservice', () => {
  let service: Ubicacionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ubicacionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
