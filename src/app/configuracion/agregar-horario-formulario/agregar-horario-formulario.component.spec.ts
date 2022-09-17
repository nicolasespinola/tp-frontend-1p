import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHorarioFormularioComponent } from './agregar-horario-formulario.component';

describe('AgregarHorarioFormularioComponent', () => {
  let component: AgregarHorarioFormularioComponent;
  let fixture: ComponentFixture<AgregarHorarioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarHorarioFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarHorarioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
