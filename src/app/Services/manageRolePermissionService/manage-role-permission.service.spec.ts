import { TestBed } from '@angular/core/testing';

import { ManageRolePermissionService } from './manage-role-permission.service';

describe('ManageRolePermissionService', () => {
  let service: ManageRolePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageRolePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
