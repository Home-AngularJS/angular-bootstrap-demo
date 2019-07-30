import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal-groups',
  templateUrl: './terminal-groups.component.html',
  styleUrls: ['./terminal-groups.component.css']
})
export class TerminalGroupsComponent implements OnInit {

  terminal : {terminalId, groupNumber, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, configChanged, merchant, allowedLanguages} =
    {terminalId:null, groupNumber:0, opPurchase:"", opReversal:"", opRefund:"", manual:"", pin:"", geoPosition:"", limitVisa:0, limitMc:0, limitProstir:0, visaAccepted:"", mcAccepted:"", prostirAccepted:"", receiptTemplate:"", configChanged:"", merchant:null, allowedLanguages:null};

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  createTerminal(){
    console.log(this.terminal);
    this.dataService.createTerminal(this.terminal);
    this.terminal = {terminalId:null, groupNumber:0, opPurchase:"", opReversal:"", opRefund:"", manual:"", pin:"", geoPosition:"", limitVisa:0, limitMc:0, limitProstir:0, visaAccepted:"", mcAccepted:"", prostirAccepted:"", receiptTemplate:"", configChanged:"", merchant:null, allowedLanguages:null};

  }
}

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

interface Language {
  languageId:string
}

interface Merchant {
  merchantId:string,
  legal_name:string,
  merchantName:string,
  merchantLocation:string,
  taxId:number,
  mcc:number,
  acquirerId:number
}

// interface Terminal {
//   terminalId:string,
//   groupNumber:number,
//   opPurchase:string,
//   opReversal:string,
//   opRefund:string,
//   manual:string,
//   pin:string,
//   geoPosition:string,
//   limitVisa:number,
//   limitMc:number,
//   limitProstir:number,
//   visaAccepted:string,
//   mcAccepted:string,
//   prostirAccepted:string,
//   receiptTemplate:string,
//   configChanged:string,
//   merchant:Merchant,
//   allowedLanguages:[Language]
// }
