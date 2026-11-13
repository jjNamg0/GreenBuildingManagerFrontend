import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { invitadoguard } from './invitadoguard';

describe('invitadoguard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => invitadoguard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
