import { TestBed } from '@angular/core/testing';
import { Geografiaservice } from './geografiaservice';

describe('Geografiaservice', () => {
  let service: Geografiaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Geografiaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
