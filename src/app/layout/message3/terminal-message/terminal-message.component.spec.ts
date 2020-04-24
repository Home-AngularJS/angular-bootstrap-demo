import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalMessageComponent } from './terminal-message.component';

describe('TerminalMessageComponent', () => {
  let component: TerminalMessageComponent;
  let fixture: ComponentFixture<TerminalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
