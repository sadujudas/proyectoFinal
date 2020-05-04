import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarreraComponent } from './registro-carrera.component';

describe('RegistroCarreraComponent', () => {
  let component: RegistroCarreraComponent;
  let fixture: ComponentFixture<RegistroCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
