import { TestBed } from '@angular/core/testing';

import { ServicefichaclinicaService } from './servicefichaclinica.service';

describe('ServicefichaclinicaService', () => {
  let service: ServicefichaclinicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicefichaclinicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
