import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Message3Component } from './message3.component';

describe('Message3Component', () => {
  let component: Message3Component;
  let fixture: ComponentFixture<Message3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Message3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Message3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
