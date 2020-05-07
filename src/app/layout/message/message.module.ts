import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SmartTableModule } from 'smart-table-ng';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './message.component';
import { TerminalMessageComponent } from './terminal-message/terminal-message.component';
import { MerchantMessageComponent } from './merchant-message/merchant-message.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { MessageRoutingModule } from './message-routing.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * @see https://stackoverflow.com/questions/43598311/component-is-part-of-the-declaration-of-2-modules
 * @desc core.js:15354 ERROR Error: Uncaught (in promise): Error: Type Component is part of the declarations of 2 modules: AppModule and Module! Please consider moving
 */
@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    SmartTableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    MessageRoutingModule,
    TranslateModule
  ],
  declarations: [
    MessageComponent,
    TerminalMessageComponent,
    MerchantMessageComponent,
    MessageTemplateComponent
  ]
})
export class MessageModule {}
