import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { MerchantMessageComponent } from './merchant-message/merchant-message.component';
import { TerminalMessageComponent } from './terminal-message/terminal-message.component';

const messageRoutes: Routes = [
  {
    path: '',
    component: MessageComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'message-template', component: MessageTemplateComponent },
          { path: 'merchant-message', component: MerchantMessageComponent },
          { path: 'terminal-message', component: TerminalMessageComponent }
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
