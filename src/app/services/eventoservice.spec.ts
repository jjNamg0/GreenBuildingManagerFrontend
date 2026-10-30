import { TestBed } from '@angular/core/testing';
import { Eventoservice } from './eventoservice';

describe('Eventoservice', () => {
  let service: Eventoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Eventoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
