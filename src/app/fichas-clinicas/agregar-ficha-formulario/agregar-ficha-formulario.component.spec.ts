import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarFichaFormularioComponent } from './agregar-ficha-formulario.component';

describe('AgregarFichaFormularioComponent', () => {
  let component: AgregarFichaFormularioComponent;
  let fixture: ComponentFixture<AgregarFichaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarFichaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarFichaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
