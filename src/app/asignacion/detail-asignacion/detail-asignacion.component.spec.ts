import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAsignacionComponent } from './detail-asignacion.component';

describe('DetailAsignacionComponent', () => {
  let component: DetailAsignacionComponent;
  let fixture: ComponentFixture<DetailAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
