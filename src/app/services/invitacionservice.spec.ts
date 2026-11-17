import { TestBed } from '@angular/core/testing';
import { Invitacionservice } from './invitacionservice';

describe('Invitacionservice', () => {
  let service: Invitacionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Invitacionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
