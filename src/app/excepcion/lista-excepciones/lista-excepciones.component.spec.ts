import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaExcepcionesComponent } from './lista-excepciones.component';

describe('ListaExcepcionesComponent', () => {
  let component: ListaExcepcionesComponent;
  let fixture: ComponentFixture<ListaExcepcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaExcepcionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaExcepcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
