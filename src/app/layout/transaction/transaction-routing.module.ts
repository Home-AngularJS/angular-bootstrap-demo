import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransactionComponent } from './transaction.component';
import { ReceiptNumberComponent } from './receipt-number/receipt-number.component';

const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'receipt-number', component: ReceiptNumberComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(transactionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TransactionRoutingModule {}
