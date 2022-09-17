import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarFichaFormularioComponent } from './modificar-ficha-formulario.component';

describe('ModificarFichaFormularioComponent', () => {
  let component: ModificarFichaFormularioComponent;
  let fixture: ComponentFixture<ModificarFichaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarFichaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarFichaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
