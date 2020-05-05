import { TestBed } from '@angular/core/testing';

import { AsistenciaService } from './asistencia.service';

describe('AsistenciaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsistenciaService = TestBed.get(AsistenciaService);
    expect(service).toBeTruthy();
  });
});
