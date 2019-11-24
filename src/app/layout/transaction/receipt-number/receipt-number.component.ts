import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import {allReceiptNumbers, selectedReceiptNumber} from '../../../core/model/transaction.model';

/**
 * @see https://stackoverflow.com/questions/36265026/angular-2-innerhtml-styling
 *      https://coryrylan.com/blog/css-encapsulation-with-angular-components
 *      https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular-2-typescript
 *        https://netbasal.com/angular-2-security-the-domsanitizer-service-2202c83bd90
 *
 *
 * https://codeday.me/ru/qa/20191028/520141.html
 * https://habr.com/ru/post/320414/
 */
@Component({
  selector: 'app-receipt-number',
  templateUrl: './receipt-number.component.html',
  styles: [
    require('./receipt-number.component.css'),
    selectedReceiptNumber.templateStyle.toString()
  ]
  // template: selectedReceiptNumber.templateBody,
  // styles: [ selectedReceiptNumber.templateStyle.toString() ]
  // template: allReceiptNumbers[1].templateBody,
  // styles: [ allReceiptNumbers[1].templateStyle.toString() ]

  // template: allReceiptNumbers[3].templateBody,
  // styles: [ allReceiptNumbers[3].templateStyle.toString() ]
  // template: `<div class="container" [innerHTML]="templateBody"></div>
  // <style>
  //     :host ::ng-deep code {
  //         font-size: 80%;
  //         color: #00FF00;
  //     }
  //     :host ::ng-deep *{
  //         margin: 0;
  //         box-sizing: border-box;
  //     }
  //     :host ::ng-deep li {
  //         list-style: none;
  //     }
  //     :host ::ng-deep a {
  //         text-decoration: none;
  //     }
  //     :host ::ng-deep .container {
  //         text-align: center;
  //     }
  //     :host ::ng-deep .table {
  //         width: 255px;
  //         margin: auto;
  //         font-family: \\'Roboto\\',sans-serif;
  //         font-size: 80%;
  //         text-transform: uppercase;
  //     }
  //     :host ::ng-deep .cell {
  //         text-align: center;
  //         width: 100%;
  //     }
  //     :host ::ng-deep .row {
  //         width: 100%;
  //     }
  //     :host ::ng-deep .left {
  //         text-align: left;
  //     }
  //     :host ::ng-deep .right {
  //         text-align: right;
  //     }
  //     :host ::ng-deep .padding-small {
  //         padding-bottom: 10px;
  //     }
  //     :host ::ng-deep .padding-large {
  //         padding-bottom: 20px;
  //     }
  //     :host ::ng-deep .bold {
  //         font-weight: bold;
  //         font-size: 1.2rem;
  //     }
  //     :host ::ng-deep .highlight {
  //         background-color: #00FF00;
  //         color: #fff;
  //     }
  //     :host ::ng-deep .footer {
  //         padding-top: 30px;
  //         font-size: 12px;
  //         text-transform: none;
  //     }
  // </style>`
  // template: `<div class="container" [innerHTML]="templateBody" [ngStyle]="{'background-color':'blue'}"></div>`
  // template: `<div class="container" [innerHTML]="templateBody" [ngStyle]='{"background-color":"blue"}'></div>`

  // template: `<!--<div class="container" [innerHTML]="templateBody"></div>-->`
  // template: `<div class="container" [innerHTML]="templateBody" [ngStyle]='myStyle'></div>`
  // encapsulation: ViewEncapsulation.None  // Use to disable CSS Encapsulation for this component
})
export class ReceiptNumberComponent implements OnInit {
// export class ReceiptNumberComponent extends HTMLElement implements OnInit {
  receiptNumber;
  templateBody;
  templateStyle;
  myStyle;
  bgColor: string;

  constructor() {
    // super();
    console.log(selectedReceiptNumber.templateStyle)
    console.log(selectedReceiptNumber.templateBody)
    this.receiptNumber = selectedReceiptNumber.templateBody;
    this.templateBody = allReceiptNumbers[3].templateBody;
    this.templateStyle = allReceiptNumbers[1].templateStyle;
    this.myStyle = '{"background-color":"blue"}';
    this.bgColor = 'blue';

    // const shadowRoot = this.attachShadow({mode: 'open'});
    // shadowRoot.innerHTML = `
    //   <style>
    //     .disabled {
    //       opacity: 0.4;
    //     }
    //   </style>
    //   <div id="container"></div>
    // `;
    // // this.container = this.shadowRoot('#container');
  }

  ngOnInit() {
  }
}
