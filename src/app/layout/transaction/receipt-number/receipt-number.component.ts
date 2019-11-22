import { Component, OnInit } from '@angular/core';
import { allReceiptNumbers } from '../../../core/model/transaction.model';

@Component({
  selector: 'app-receipt-number',
  templateUrl: './receipt-number.component.html',
  styles: [
    require('./receipt-number.component.css'),
    allReceiptNumbers[1].templateStyle.toString()
  ]
})
export class ReceiptNumberComponent implements OnInit {
  receiptNumber;

  constructor() { }

  ngOnInit() {
    this.receiptNumber = allReceiptNumbers[1].templateBody;
  }
}
