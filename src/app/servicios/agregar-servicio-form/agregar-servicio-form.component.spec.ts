import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarServicioFormComponent } from './agregar-servicio-form.component';

describe('AgregarServicioFormComponent', () => {
  let component: AgregarServicioFormComponent;
  let fixture: ComponentFixture<AgregarServicioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarServicioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarServicioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
