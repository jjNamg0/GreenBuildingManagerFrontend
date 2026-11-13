import { TestBed } from '@angular/core/testing';
import { Espacioservice } from './espacioservice';

describe('Espacioservice', () => {
  let service: Espacioservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Espacioservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
