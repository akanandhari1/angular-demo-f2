import { TestBed } from '@angular/core/testing';

import { SharedExportService } from './shared-export.service';

describe('SharedExportService', () => {
  let service: SharedExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
