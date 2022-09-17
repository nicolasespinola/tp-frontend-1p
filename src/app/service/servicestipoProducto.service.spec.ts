import { TestBed } from '@angular/core/testing';

import { ServicetipoProductoService } from './servicestipoProducto.service';

describe('ServicetipoProductoService', () => {
  let service: ServicetipoProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicetipoProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
