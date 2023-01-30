import { TestBed } from '@angular/core/testing';

import { UploadImageServiceService } from './upload-image-service.service';

describe('UploadImageServiceService', () => {
  let service: UploadImageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadImageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
