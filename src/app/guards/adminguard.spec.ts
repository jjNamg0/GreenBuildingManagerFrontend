import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminguard } from './adminguard';

describe('adminguard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => adminguard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
