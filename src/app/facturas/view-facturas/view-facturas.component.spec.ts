import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFacturasComponent } from './view-facturas.component';

describe('ViewFacturasComponent', () => {
  let component: ViewFacturasComponent;
  let fixture: ComponentFixture<ViewFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
