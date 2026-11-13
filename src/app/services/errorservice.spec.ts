import { TestBed } from '@angular/core/testing';
import { Errorservice } from './errorservice';

describe('Errorservice', () => {
  let service: Errorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Errorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
