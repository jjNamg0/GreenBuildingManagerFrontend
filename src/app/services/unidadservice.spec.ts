import { TestBed } from '@angular/core/testing';
import { Unidadservice } from './unidadservice';

describe('Unidadservice', () => {
  let service: Unidadservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Unidadservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
