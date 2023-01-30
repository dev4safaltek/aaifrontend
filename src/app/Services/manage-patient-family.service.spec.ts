import { TestBed } from '@angular/core/testing';

import { ManagePatientFamilyService } from './manage-patient-family.service';

describe('ManagePatientFamilyService', () => {
  let service: ManagePatientFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePatientFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
