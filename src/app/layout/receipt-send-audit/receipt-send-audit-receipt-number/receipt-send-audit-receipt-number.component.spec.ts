import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptSendAuditReceiptNumberComponent } from './receipt-send-audit-receipt-number.component';

describe('ReceiptSendAuditReceiptNumberComponent', () => {
  let component: ReceiptSendAuditReceiptNumberComponent;
  let fixture: ComponentFixture<ReceiptSendAuditReceiptNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptSendAuditReceiptNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptSendAuditReceiptNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
