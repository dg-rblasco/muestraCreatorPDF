import { TestBed } from '@angular/core/testing';

import { LazyLoadingLibraryServiceService } from './lazy-loading-library-service.service';

describe('LazyLoadingLibraryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LazyLoadingLibraryServiceService = TestBed.get(LazyLoadingLibraryServiceService);
    expect(service).toBeTruthy();
  });
});
