import { TestBed } from '@angular/core/testing';
import { Resumenservice } from './resumenservice';

describe('Resumenservice', () => {
  let service: Resumenservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Resumenservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
