import { TestBed } from '@angular/core/testing';

import { FormtypelistService } from './formtypelist.service';

describe('FormtypelistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormtypelistService = TestBed.get(FormtypelistService);
    expect(service).toBeTruthy();
  });
});
