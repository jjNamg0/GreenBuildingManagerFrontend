import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { conjuntoguard } from './conjuntoguard';

describe('conjuntoguard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => conjuntoguard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
