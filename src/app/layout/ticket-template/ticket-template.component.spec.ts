import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTemplateComponent } from './ticket-template.component';

describe('TicketTemplateComponent', () => {
  let component: TicketTemplateComponent;
  let fixture: ComponentFixture<TicketTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
