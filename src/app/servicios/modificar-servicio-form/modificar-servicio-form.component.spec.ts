import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarServicioFormComponent } from './modificar-servicio-form.component';

describe('ModificarServicioFormComponent', () => {
  let component: ModificarServicioFormComponent;
  let fixture: ComponentFixture<ModificarServicioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarServicioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
