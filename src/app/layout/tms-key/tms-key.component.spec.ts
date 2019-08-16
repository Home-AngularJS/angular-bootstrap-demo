import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmsKeyComponent } from './tms-key.component';

describe('TmsKeyComponent', () => {
  let component: TmsKeyComponent;
  let fixture: ComponentFixture<TmsKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmsKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmsKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
