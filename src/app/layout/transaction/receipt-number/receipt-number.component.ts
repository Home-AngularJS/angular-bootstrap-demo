import { Component, OnInit } from '@angular/core';
import { selectedReceiptNumber } from '../../../core/model/transaction.model';

@Component({
  selector: 'app-receipt-number',
  templateUrl: './receipt-number.component.html',
  styles: [
    require('./receipt-number.component.css'),
    selectedReceiptNumber.templateStyle.toString()
  ]
})
export class ReceiptNumberComponent implements OnInit {
  receiptNumber;

  constructor() { }

  ngOnInit() {
    console.log(selectedReceiptNumber.templateStyle)
    console.log(selectedReceiptNumber.templateBody)
    this.receiptNumber = selectedReceiptNumber.templateBody;
  }
}
