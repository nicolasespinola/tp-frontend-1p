import { TestBed } from '@angular/core/testing';

import { ServicepresentacionService } from './servicepresentacion.service';

describe('ServicepresentacionService', () => {
  let service: ServicepresentacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicepresentacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
