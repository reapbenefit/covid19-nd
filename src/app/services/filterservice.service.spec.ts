import { TestBed } from '@angular/core/testing';

import { FilterserviceService } from './filterservice.service';

describe('FilterserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilterserviceService = TestBed.get(FilterserviceService);
    expect(service).toBeTruthy();
  });
});
