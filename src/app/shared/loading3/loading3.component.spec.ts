import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading3Component } from './loading3.component';

describe('Loading3Component', () => {
  let component: Loading3Component;
  let fixture: ComponentFixture<Loading3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loading3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loading3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
