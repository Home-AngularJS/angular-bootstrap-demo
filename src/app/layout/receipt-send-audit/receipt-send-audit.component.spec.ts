import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptSendAuditComponent } from './receipt-send-audit.component';

describe('ReceiptSendAuditComponent', () => {
  let component: ReceiptSendAuditComponent;
  let fixture: ComponentFixture<ReceiptSendAuditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptSendAuditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptSendAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
