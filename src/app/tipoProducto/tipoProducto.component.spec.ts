import { ComponentFixture, TestBed } from '@angular/core/testing';

import { tipoProductoComponent } from './tipoProducto.component';

describe('tipoProductoComponent', () => {
  let component: tipoProductoComponent;
  let fixture: ComponentFixture<tipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ tipoProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(tipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
