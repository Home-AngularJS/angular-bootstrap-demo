import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Merchant2Component } from './merchant2.component';

describe('Merchant2Component', () => {
  let component: Merchant2Component;
  let fixture: ComponentFixture<Merchant2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Merchant2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Merchant2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
