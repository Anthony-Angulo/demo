import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsignacionComponent } from './create-asignacion.component';

describe('CreateAsignacionComponent', () => {
  let component: CreateAsignacionComponent;
  let fixture: ComponentFixture<CreateAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAsignacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
