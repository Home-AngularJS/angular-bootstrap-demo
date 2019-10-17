import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterAttestationComponent } from './parameter-attestation.component';

describe('ParameterAttestationComponent', () => {
  let component: ParameterAttestationComponent;
  let fixture: ComponentFixture<ParameterAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
