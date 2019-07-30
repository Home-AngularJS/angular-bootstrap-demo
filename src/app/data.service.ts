import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  terminals = [
    {
      "terminalId": "cb22bb62-0d1f-4228-8440-276819bf12d4",
      "groupNumber": 1,
      "opPurchase": "N",
      "opReversal": "Y",
      "opRefund": "Y",
      "manual": "Y",
      "pin": "Y",
      "geoPosition": "Y",
      "limitVisa": 100000,
      "limitMc": 50000,
      "limitProstir": 100000,
      "visaAccepted": "Y",
      "mcAccepted": "Y",
      "prostirAccepted": "Y",
      "receiptTemplate": 1,
      "configChanged": "N",
      "merchant": {
        "merchantId": "0d385b77-13e3-4453-ac32-acace7e2c7ac",
        "legal_name": "ТОВ.Сонечко",
        "merchantName": "COFEE SHOP VESELKA",
        "merchantLocation": "25-A PRORIZNA ST.",
        "taxId": 1235847895,
        "mcc": 6012,
        "acquirerId": "42562801"
      },
      "allowedLanguages": [
        {
          "languageId": "UKR"
        },
        {
          "languageId": "RUS"
        },
        {
          "languageId": "ENG"
        }
      ]
    },
    {
      "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
      "groupNumber": 1,
      "opPurchase": "Y",
      "opReversal": "Y",
      "opRefund": "Y",
      "manual": "Y",
      "pin": "Y",
      "geoPosition": "Y",
      "limitVisa": 100000,
      "limitMc": 50000,
      "limitProstir": 100000,
      "visaAccepted": "Y",
      "mcAccepted": "Y",
      "prostirAccepted": "Y",
      "receiptTemplate": 1,
      "configChanged": "N",
      "merchant": {
        "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
        "legal_name": "ТОВ.",
        "merchantName": "COFEE SHOP VESELKA",
        "merchantLocation": "25-A PRORIZNA ST.",
        "taxId": 1235847895,
        "mcc": 6012,
        "acquirerId": "42562801"
      },
      "allowedLanguages": [
        {
          "languageId": "UKR"
        },
        {
          "languageId": "RUS"
        },
        {
          "languageId": "ENG"
        }
      ]
    },


    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // },
    // {
    //   "terminalId": "629275d3-d47f-45a4-8f7d-d3929bbeecca",
    //   "groupNumber": 1,
    //   "opPurchase": "Y",
    //   "opReversal": "Y",
    //   "opRefund": "Y",
    //   "manual": "Y",
    //   "pin": "Y",
    //   "geoPosition": "Y",
    //   "limitVisa": 100000,
    //   "limitMc": 50000,
    //   "limitProstir": 100000,
    //   "visaAccepted": "Y",
    //   "mcAccepted": "Y",
    //   "prostirAccepted": "Y",
    //   "receiptTemplate": 1,
    //   "configChanged": "N",
    //   "merchant": {
    //     "merchantId": "f6ffb4b4-44f0-494d-9d2b-031f1cc03504",
    //     "legal_name": "ТОВ.",
    //     "merchantName": "COFEE SHOP VESELKA",
    //     "merchantLocation": "25-A PRORIZNA ST.",
    //     "taxId": 1235847895,
    //     "mcc": 6012,
    //     "acquirerId": "42562801"
    //   },
    //   "allowedLanguages": [
    //     {
    //       "languageId": "UKR"
    //     },
    //     {
    //       "languageId": "RUS"
    //     },
    //     {
    //       "languageId": "ENG"
    //     }
    //   ]
    // }
  ];

  terminalGroups = [
    {
      "groupNumber": 1,
      "groupName": "HoReCa",
      "opPurchase": "Y",
      "opReversal": "Y",
      "opRefund": "Y",
      "manual": "Y",
      "pin": "Y",
      "geoPosition": "Y",
      "limitVisa": 100000,
      "limitMc": 50000,
      "limitProstir": 100000,
      "visaAccepted": "Y",
      "mcAccepted": "Y",
      "prostirAccepted": "Y",
      "receiptTemplate": 1,
      "allowedLanguages": [
        {
          "languageId": "UKR"
        },
        {
          "languageId": "RUS"
        },
        {
          "languageId": "ENG"
        }
      ]
    },
    {
      "groupNumber": 2,
      "groupName": "Taxi",
      "opPurchase": "Y",
      "opReversal": "N",
      "opRefund": "N",
      "manual": "N",
      "pin": "N",
      "geoPosition": "Y",
      "limitVisa": 100000,
      "limitMc": 50000,
      "limitProstir": 100000,
      "visaAccepted": "Y",
      "mcAccepted": "Y",
      "prostirAccepted": "Y",
      "receiptTemplate": 2,
      "allowedLanguages": [
        {
          "languageId": "RUS"
        },
        {
          "languageId": "ENG"
        },
        {
          "languageId": "GEO"
        }
      ]
    }
  ];

  transactions = {
    "content": [
      {
        "transactionId": "12345",
        "amount": 12550,
        "amountOther": "0",
        "currency": 980,
        "operation": "PURCHASE",
        "panMasked": "************2555",
        "panSn": "0",
        "transactionDate": "2019-06-24T00:00:00.000+0000",
        "formFactor": "238C0000",
        "approvalCode": "25F654",
        "responseCode": "APPROVED",
        "rrn": "518745621534",
        "statusCode": "Success"
      },
      {
        "transactionId": "12346",
        "amount": 12550,
        "amountOther": null,
        "currency": 980,
        "operation": "PURCHASE",
        "panMasked": "************2555",
        "panSn": "0",
        "transactionDate": "2019-06-24T00:00:00.000+0000",
        "formFactor": "238C0000",
        "approvalCode": "25F654",
        "responseCode": "APPROVED",
        "rrn": "518745621534",
        "statusCode": "Success"
      }
    ],
    "pageable": {
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "pageSize": 20,
      "pageNumber": 0,
      "offset": 0,
      "paged": true,
      "unpaged": false
    },
    "last": true,
    "totalPages": 1,
    "totalElements": 2,
    "first": true,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "numberOfElements": 2,
    "size": 20,
    "number": 0,
    "empty": false
  };

  constructor() { }

  public getTerminals():Array<{terminalId, groupNumber, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, configChanged, merchant, allowedLanguages}>{
    return this.terminals;
  }

  public updateTerminal(terminal: {terminalId, groupNumber, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, configChanged, merchant, allowedLanguages}){
    this.terminals.push(terminal);
  }

  public getTerminalGroups():Array<{groupNumber, groupName, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, allowedLanguages}>{
    return this.terminalGroups;
  }

  // public createTerminalGroup(terminalGroup: {groupNumber, groupName, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, allowedLanguages}){
  //   this.terminals.push(terminalGroup);
  // }

  public getTransactions():{content, pageable, last, totalPages, totalElements, first, sort, numberOfElements, size, number, empty} {
    return this.transactions;
  }
}

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

// interface Language {
//   languageId:string
// }
//
// interface Merchant {
//   merchantId:string,
//   legal_name:string,
//   merchantName:string,
//   merchantLocation:string,
//   taxId:number,
//   mcc:number,
//   acquirerId:number
// }

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

