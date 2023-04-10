import { TestBed } from '@angular/core/testing';

import { InsuranceProviderService } from './insurance-provider.service';

describe('InsuranceProviderService', () => {
  let service: InsuranceProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
