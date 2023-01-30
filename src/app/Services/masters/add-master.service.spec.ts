import { TestBed } from '@angular/core/testing';

import { AddMasterService } from './add-master.service';

describe('AddMasterService', () => {
  let service: AddMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
