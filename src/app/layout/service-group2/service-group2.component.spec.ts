import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGroup2Component } from './service-group2.component';

describe('ServiceGroup2Component', () => {
  let component: ServiceGroup2Component;
  let fixture: ComponentFixture<ServiceGroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
