import { TestBed } from '@angular/core/testing';
import { Rutaservice } from './rutaservice';

describe('Rutaservice', () => {
  let service: Rutaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rutaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
