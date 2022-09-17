import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasClinicasComponent } from './fichas-clinicas.component';

describe('FichasClinicasComponent', () => {
  let component: FichasClinicasComponent;
  let fixture: ComponentFixture<FichasClinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichasClinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasClinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
