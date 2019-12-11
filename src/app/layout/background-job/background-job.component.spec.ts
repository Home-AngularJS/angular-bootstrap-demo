import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundJobComponent } from './background-job.component';

describe('BackgroundJobComponent', () => {
  let component: BackgroundJobComponent;
  let fixture: ComponentFixture<BackgroundJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroundJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackgroundJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
