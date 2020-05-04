import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroHorarioComponent } from './registro-horario.component';

describe('RegistroHorarioComponent', () => {
  let component: RegistroHorarioComponent;
  let fixture: ComponentFixture<RegistroHorarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroHorarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
