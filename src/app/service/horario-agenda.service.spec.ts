import { TestBed } from '@angular/core/testing';

import { HorarioAgendaService } from './horario-agenda.service';

describe('HorarioAgendaService', () => {
  let service: HorarioAgendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorarioAgendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
