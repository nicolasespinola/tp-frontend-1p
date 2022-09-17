import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFichasComponent } from './tabla-fichas.component';

describe('TablaFichasComponent', () => {
  let component: TablaFichasComponent;
  let fixture: ComponentFixture<TablaFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaFichasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
