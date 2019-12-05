import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bank2Component } from './bank2.component';

describe('Bank2Component', () => {
  let component: Bank2Component;
  let fixture: ComponentFixture<Bank2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bank2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bank2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
