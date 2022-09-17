import { TestBed } from '@angular/core/testing';

import { ServicereservaService } from './servicereserva.service';

describe('ServicereservaService', () => {
  let service: ServicereservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicereservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
