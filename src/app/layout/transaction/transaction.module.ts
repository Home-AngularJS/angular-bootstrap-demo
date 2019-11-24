import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SmartTableModule } from 'smart-table-ng';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { TransactionComponent } from './transaction.component';
import { ReceiptNumberComponent } from './receipt-number/receipt-number.component';
import { TransactionRoutingModule } from './transaction-routing.module';

/**
 * @see https://stackoverflow.com/questions/43598311/component-is-part-of-the-declaration-of-2-modules
 * @desc core.js:15354 ERROR Error: Uncaught (in promise): Error: Type Component is part of the declarations of 2 modules: AppModule and Module! Please consider moving
 */

@NgModule({
  imports: [
    CommonModule,
    TransactionRoutingModule,
    DialogModule,
    SmartTableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    TransactionComponent,
    // SafePipe,
    ReceiptNumberComponent
  ]
})
export class TransactionModule {}
