import { Component, OnInit } from '@angular/core';
import { allReceiptNumbers } from '../../../core/model/transaction.model';

@Component({
  selector: 'app-receipt-send-audit-receipt-number',
  templateUrl: './receipt-send-audit-receipt-number.component.html',
  styles: [
    require('./receipt-send-audit-receipt-number.component.css'),
    allReceiptNumbers[1].templateStyle.toString()
  ]
})
export class ReceiptSendAuditReceiptNumberComponent implements OnInit {
  receiptNumber;

  constructor() { }

  ngOnInit() {
    this.receiptNumber = allReceiptNumbers[1].templateBody;
  }
}
