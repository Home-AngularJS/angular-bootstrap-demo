import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Message3Component } from './message3.component';
import { TerminalMessageComponent } from './terminal-message/terminal-message.component';

const message3Routes: Routes = [
  {
    path: '',
    component: Message3Component,
    children: [
      {
        path: '',
        children: [
          { path: 'terminal-message', component: TerminalMessageComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(message3Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class Message3RoutingModule {}
