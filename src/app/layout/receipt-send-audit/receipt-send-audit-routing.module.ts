import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReceiptSendAuditComponent } from './receipt-send-audit.component';
import { ReceiptSendAuditReceiptNumberComponent } from './receipt-send-audit-receipt-number/receipt-send-audit-receipt-number.component';

const transactionRoutes: Routes = [
  {
    path: '',
    component: ReceiptSendAuditComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'receipt-number/:id', component: ReceiptSendAuditReceiptNumberComponent }
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
export class ReceiptSendAuditRoutingModule {}
