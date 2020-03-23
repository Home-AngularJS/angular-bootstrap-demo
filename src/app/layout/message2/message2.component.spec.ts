import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Message2Component } from './message2.component';

describe('Message2Component', () => {
  let component: Message2Component;
  let fixture: ComponentFixture<Message2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Message2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Message2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
