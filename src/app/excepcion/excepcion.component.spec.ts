import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcepcionComponent } from './excepcion.component';

describe('ExcepcionComponent', () => {
  let component: ExcepcionComponent;
  let fixture: ComponentFixture<ExcepcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcepcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcepcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
