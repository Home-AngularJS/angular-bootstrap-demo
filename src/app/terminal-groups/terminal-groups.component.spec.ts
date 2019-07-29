import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalGroupsComponent } from './terminal-groups.component';

describe('TerminalCreateComponent', () => {
  let component: TerminalGroupsComponent;
  let fixture: ComponentFixture<TerminalGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
