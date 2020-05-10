import { TestBed } from '@angular/core/testing';

import { OauthLoginService } from './oauth-login.service';

describe('OauthLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OauthLoginService = TestBed.get(OauthLoginService);
    expect(service).toBeTruthy();
  });
});
