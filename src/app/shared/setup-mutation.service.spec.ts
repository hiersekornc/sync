import { TestBed } from '@angular/core/testing';

import { SetupMutationService } from './setup-mutation.service';

describe('SetupServiceService', () => {
  let service: SetupMutationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupMutationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
