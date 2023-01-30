import { TestBed } from '@angular/core/testing';

import { GetAllMasterService } from './get-all-master.service';

describe('GetAllMasterService', () => {
  let service: GetAllMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
