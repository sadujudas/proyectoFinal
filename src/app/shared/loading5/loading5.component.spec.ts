import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading5Component } from './loading5.component';

describe('Loading5Component', () => {
  let component: Loading5Component;
  let fixture: ComponentFixture<Loading5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loading5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loading5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
