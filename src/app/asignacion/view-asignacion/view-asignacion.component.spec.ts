import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAsignacionComponent } from './view-asignacion.component';

describe('ViewAsignacionComponent', () => {
  let component: ViewAsignacionComponent;
  let fixture: ComponentFixture<ViewAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
