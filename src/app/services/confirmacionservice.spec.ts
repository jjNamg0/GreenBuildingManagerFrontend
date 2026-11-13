import { TestBed } from '@angular/core/testing';
import { Confirmacionservice } from './confirmacionservice';

describe('Confirmacionservice', () => {
  let service: Confirmacionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Confirmacionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
