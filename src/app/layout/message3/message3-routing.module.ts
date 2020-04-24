import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Message3Component } from './message3.component';
import { AaaComponent } from './aaa/aaa.component';

const message3Routes: Routes = [
  {
    path: '',
    component: Message3Component,
    children: [
      {
        path: '',
        children: [
          { path: 'aaa', component: AaaComponent }
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
