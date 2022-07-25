import { TestBed } from '@angular/core/testing';

import { TbApiService } from './tb-api.service';

describe('TbApiService', () => {
  let service: TbApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
