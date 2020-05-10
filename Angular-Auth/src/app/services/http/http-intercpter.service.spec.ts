import { TestBed } from '@angular/core/testing';

import { HttpIntercpterService } from './http-intercpter.service';

describe('HttpIntercpterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpIntercpterService = TestBed.get(HttpIntercpterService);
    expect(service).toBeTruthy();
  });
});
