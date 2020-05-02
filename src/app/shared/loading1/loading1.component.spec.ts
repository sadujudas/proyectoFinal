import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Loading1Component } from './loading1.component';

describe('Loading1Component', () => {
  let component: Loading1Component;
  let fixture: ComponentFixture<Loading1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Loading1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Loading1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
