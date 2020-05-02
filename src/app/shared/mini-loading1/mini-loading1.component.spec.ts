import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniLoading1Component } from './mini-loading1.component';

describe('MiniLoading1Component', () => {
  let component: MiniLoading1Component;
  let fixture: ComponentFixture<MiniLoading1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniLoading1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniLoading1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
