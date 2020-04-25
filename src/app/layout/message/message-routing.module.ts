import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { TerminalMessageComponent } from './terminal-message/terminal-message.component';
import { MerchantMessageComponent } from './merchant-message/merchant-message.component';
import { MessageTemplateComponent } from './message-template/message-template.component';

const messageRoutes: Routes = [
  {
    path: '',
    component: MessageComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'terminal-message', component: TerminalMessageComponent },
          { path: 'merchant-message', component: MerchantMessageComponent },
          { path: 'message-template', component: MessageTemplateComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(messageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MessageRoutingModule {}
