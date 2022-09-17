import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaExcepcionComponent } from './nueva-excepcion.component';

describe('NuevaExcepcionComponent', () => {
  let component: NuevaExcepcionComponent;
  let fixture: ComponentFixture<NuevaExcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaExcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
