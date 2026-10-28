import { TestBed } from '@angular/core/testing';
import { Authinterceptor } from './authinterceptor';

describe('Authinterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [Authinterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: Authinterceptor = TestBed.inject(Authinterceptor);
    expect(interceptor).toBeTruthy();
  });
});
