import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosHorariosComponent } from './filtros-horarios.component';

describe('FiltrosHorariosComponent', () => {
  let component: FiltrosHorariosComponent;
  let fixture: ComponentFixture<FiltrosHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrosHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
