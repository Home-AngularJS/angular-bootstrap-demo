import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { SmartTableModule } from 'smart-table-ng';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { Message3Component } from './message3.component';
import { AaaComponent } from './aaa/aaa.component';
import { Message3RoutingModule } from './message3-routing.module';

/**
 * @see https://stackoverflow.com/questions/43598311/component-is-part-of-the-declaration-of-2-modules
 * @desc core.js:15354 ERROR Error: Uncaught (in promise): Error: Type Component is part of the declarations of 2 modules: AppModule and Module! Please consider moving
 */
@NgModule({
  imports: [
    CommonModule,
    Message3RoutingModule,
    DialogModule,
    SmartTableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    Message3Component,
    AaaComponent
  ]
})
export class Message3Module {}
