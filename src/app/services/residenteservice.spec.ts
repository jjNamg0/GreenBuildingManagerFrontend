import { TestBed } from '@angular/core/testing';
import { Residenteservice } from './residenteservice';

describe('Residenteservice', () => {
  let service: Residenteservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Residenteservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
