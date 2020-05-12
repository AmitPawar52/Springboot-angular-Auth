import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorService } from './loader-interceptor.service';

describe('LoaderInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderInterceptorService = TestBed.get(LoaderInterceptorService);
    expect(service).toBeTruthy();
  });
});
