import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SmartTableModule } from 'smart-table-ng';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';

import { SafePipe, ReceiptSendAuditComponent } from './receipt-send-audit.component';
import { ReceiptSendAuditReceiptNumberComponent } from './receipt-send-audit-receipt-number/receipt-send-audit-receipt-number.component';
import { ReceiptSendAuditRoutingModule } from './receipt-send-audit-routing.module';

/**
 * @see https://stackoverflow.com/questions/43598311/component-is-part-of-the-declaration-of-2-modules
 * @desc core.js:15354 ERROR Error: Uncaught (in promise): Error: Type Component is part of the declarations of 2 modules: AppModule and Module! Please consider moving
 */

@NgModule({
  imports: [
    CommonModule,
    ReceiptSendAuditRoutingModule,
    DialogModule,
    SmartTableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    ReceiptSendAuditComponent,
    SafePipe,
    ReceiptSendAuditReceiptNumberComponent
  ]
})
export class ReceiptSendAuditModule {}
