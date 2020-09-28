import { TestBed } from '@angular/core/testing';

import { DataRetrievalService } from './data-retrieval.service';

describe('DataServiceService', () => {
  let service: DataRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
