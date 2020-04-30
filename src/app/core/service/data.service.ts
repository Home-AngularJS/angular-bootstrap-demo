import { Injectable } from '@angular/core';

/**
 * https://stackoverflow.com/questions/50945067/angular-6-staticinjectorerror-no-provider-for-options/51835757
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  cities: any = [
    {'key':'Kiev', 'value':'Киев'},
    {'key':'Florida', 'value':'Флорида'},
    {'key':'South Dakota', 'value':'Северная Дакота'},
    {'key':'Tennessee', 'value':'Тунис'},
    {'key':'Michigan', 'value':'Мечиган'}
  ];

  takeChoices: any = [
    {'key':'Y', 'value':'Да'},
    {'key':'N', 'value':'Нет'}
  ];

  takeChoiceActions: any = [
    {'key':'Y', 'value':'Активен'},
    {'key':'N', 'value':'Заблокирован'}
  ];

  takeCurrencies: any = [
    {'code':'0980', 'letterCode':'UAH'}
  ];

  takeVelocityTimeUnits: any = [
    {'key':'NANOS', 'value':'Nanos'},
    {'key':'MICROS', 'value':'Micros'},
    {'key':'MILLIS', 'value':'Millis'},
    {'key':'SECONDS', 'value':'Seconds'},
    {'key':'MINUTES', 'value':'Minutes'},
    {'key':'HOURS', 'value':'Hours'},
    {'key':'HALFDAYS', 'value':'HalfDays'},
    {'key':'DAYS', 'value':'Days'},
    {'key':'WEEKS', 'value':'Weeks'},
    {'key':'MONTHS', 'value':'Months'},
    {'key':'YEARS', 'value':'Years'},
    {'key':'DECADES', 'value':'Decades'},
    {'key':'CENTURIES', 'value':'Centuries'},
    {'key':'MILLENNIA', 'value':'Millennia'},
    {'key':'ERAS', 'value':'Eras'},
    {'key':'FOREVER', 'value':'Forever'}
  ];

  allAllowedLanguages: any = [
    'UKR',
    'RUS',
    'ENG',
    'GEO'
  ];

  basicReceiptSendChannels: any = [
    'Email',
    'QR',
    'SMS'
  ];

  allAttestation: any = [
    'Целостность приложения',
    'Права приложения',
    'Тестирование приложения',
    'Эмуляция приложения',
    'Гео-позиция',
    'Частота транзакций',
    'Целостность каналов',
  ];

  terminals = {
    "content": [
      {
        "terminalId": "cb22bb62",
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
        "dateTimeInit": "2019-08-05T15:30:25.799Z",
        "merchant": {
          "merchantId": "d7f08eab-544a-4b69-a7e8-a2e90f7d79fe",
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
        "terminalId": "cb22bb63",
        "groupNumber": 2,
        "opPurchase": "Y",
        "opReversal": "Y",
        "opRefund": "Y",
        "manual": "Y",
        "pin": "Y",
        "geoPosition": "Y",
        "limitVisa": 300000,
        "limitMc": 40000,
        "limitProstir": 200000,
        "visaAccepted": "Y",
        "mcAccepted": "Y",
        "prostirAccepted": "Y",
        "receiptTemplate": 1,
        "configChanged": "N",
        "merchant": {
          "merchantId": "0d385b77-13e3-4453-ac32-acace7e2c7ab",
          "merchantName": "COFEE SHOP VESELKA2",
          "merchantLocation": "26-A PRORIZNA ST.",
          "taxId": 1235847896,
          "mcc": 6013,
          "acquirerId": "42562802"
        },
        "allowedLanguages": [
          {
            "languageId": "ENG"
          }
        ]
      },
      {
        "terminalId": "b815403a",
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
          "merchantId": "d7f08eab-544a-4b69-a7e8-a2e90f7d79fe",
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
        "terminalId": "c6aa0317",
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
          "merchantId": "7a86ab78-15bc-4cc4-ae3c-67f7d8a8f909",
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
        "terminalId": "55a05ffa",
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
          "merchantId": "cfd678a3-0a46-4bca-9919-e3602c783320",
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
        "terminalId": "aa1d5338",
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
          "merchantId": "f8b4a888-07cf-4c32-83dc-4384810f4ddc",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
        "terminalId": "5180b5bf",
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
          "merchantId": "91f05e13-e5a7-4f26-9a75-c5336ebfd6c7",
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
      "unpaged": false,
      "paged": true
    },
    "totalElements": 7,
    "last": true,
    "totalPages": 1,
    "first": true,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "numberOfElements": 7,
    "size": 20,
    "number": 0,
    "empty": false
  };

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

  panMaskeds = [
    {
      "id": "001",
      "beginMask": 1,
      "endMask": 1,
      "maskSymbol": "*"
    },
    {
      "id": "002",
      "beginMask": 2,
      "endMask": 2,
      "maskSymbol": "X"
    },
    {
      "id": "003",
      "beginMask": 3,
      "endMask": 3,
      "maskSymbol": "#"
    }
    ];

  allowedLanguages = [
    {
      "number": 1,
      "languageId": "UKR"
    },
    {
      "number": 2,
      "languageId": "RUS"
    },
    {
      "number": 3,
      "languageId": "ENG"
    },
    {
      "number": 4,
      "languageId": "GEO"
    }
  ];

  banks = [
    {
      "code": '0001',
      "bankName": "AVAL"
    }
  ];

  devices = [
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "73eddb6a-0d20-4716-9456-bf808ffb",
      "deviceName": "Pixel 2",
      "deviceSn": "4d5a3179978449d39ec47f02704be7fe",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T09:56:31.828+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "21263c2a9b0d49c29b477eb78142b3d9",
      "deviceName": "MySamsung",
      "deviceSn": "efa97ee669ad4913b14f7586466d2575",
      "deviceStatus": 4,
      "imei": "352712098456841",
      "initDate": "2019-07-26T12:15:48.603+0000",
      "osVersion": "9.1",
      "serialNumber": "R58K30XV5ZN"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "5a0ed3b3-fa56-433a-9966-5f044f42",
      "deviceName": "Pixel 2",
      "deviceSn": "ffee8a16efdb4ca0ac324c2736c1916a",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T08:57:45.962+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "8ddc8543-e49b-4831-8bb0-a057b220",
      "deviceName": "Pixel 2",
      "deviceSn": "5c084b7baca04f26becc7e7f532073cd",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T08:57:45.962+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "3357839b-c96c-4ee6-8d0f-ac4e3e41",
      "deviceName": "Pixel 3",
      "deviceSn": "40f4ba2e03c348148c81406f84d73e1c",
      "deviceStatus": 4,
      "imei": "084aadfafebfefa1",
      "initDate": "2019-08-02T13:36:40.445+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "82818406-eb4b-4093-b9c3-f04012a0",
      "deviceName": "Pixel 2",
      "deviceSn": "2b3982e9f4ba4cb0a743e7b9cfc30b8f",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T12:03:27.858+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "49b1f3f7-6dbe-484c-8117-76cf9542",
      "deviceName": "Pixel 2",
      "deviceSn": "c208b430a0e34537a553b1fd20841635",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T12:24:33.146+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "054ec441-3de9-413f-835f-822a228e",
      "deviceName": "Pixel 2",
      "deviceSn": "24ba33136aa7474fa43a06500e8a31c4",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-02T10:56:55.821+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    },
    {
      "appId": null,
      "appStatus": "A",
      "appVersion": null,
      "deviceFingerprint": "56a3651b-4214-4095-aa8c-6aa13d7a",
      "deviceName": "Pixel 2",
      "deviceSn": "9f653ceab4c94e278d3333707894af0a",
      "deviceStatus": 4,
      "imei": "86160979ae1c0564",
      "initDate": "2019-08-05T09:21:13.460+0000",
      "osVersion": "28",
      "serialNumber": "unknown"
    }
  ];

  ipsCardGroups = [
    {
      "mpsId": "MPS01",
      "mpsName": "VISA",
      "firsNumber": 4,
      "symbol": "V",
      "limit": 10000
    },
    {
      "mpsId": "MPS02",
      "mpsName": "MASTERCARD",
      "firsNumber": 5,
      "symbol": "M",
      "limit": 50000
    }
  ];

  receiptTemplates = [
    {
      'id': 2,
      'templateName': 'Украинская версия',
      'templateStyle': 'body {\n' +
      '  font-size: 95%;\n' +
      '}\n' +
      'code {\n' +
      '  font-size: 100%;\n' +
      '  color: #000000;\n' +
      '}\n' +
      '*{\n' +
      '  margin: 0;\n' +
      '  box-sizing: border-box;\n' +
      '}\n' +
      'li {\n' +
      '  list-style: none;\n' +
      '}\n' +
      'a {\n' +
      '  text-decoration: none;\n' +
      '}\n' +
      '.bill-block{\n' +
      '  display: flex;\n' +
      '  font-family: \'Roboto\', sans-serif;\n' +
      '  text-align: center;\n' +
      '  text-transform: uppercase;\n' +
      '  height: 70vh;\n' +
      '  position: relative;\n' +
      '}\n' +
      '.bill-block>div{\n' +
      '  margin: auto;\n' +
      '}\n' +
      '.bill-block>div>p{\n' +
      '  display: flex;\n' +
      '  justify-content: space-between;\n' +
      '}\n' +
      '.bill-block>div>span{\n' +
      '  display: block\n' +
      '}\n' +
      '.bill-block__text--borderBig{\n' +
      '  margin-bottom: 20px;\n' +
      '}\n' +
      '.bill-block__text--borderSmall{\n' +
      '  margin-bottom: 10px;\n' +
      '}\n' +
      '.bill-block__text--bold{\n' +
      '  font-weight: bold;\n' +
      '  font-size: 1.2rem;\n' +
      '}\n' +
      '.bill-block__text--result{\n' +
      '  background-color: #000000;\n' +
      '  color: #fff;\n' +
      '}\n' +
      '.bill-block__text--footerCenter {\n' +
      '  font-size: 12px;\n' +
      '  text-transform: none;\n' +
      '}',
      'templateBody': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>__NAME_BANK__</span>\n' +
      '    <span>__M_NAME__</span>\n' +
      '    <span class="bill-block__text--borderBig">__M_LOCATION__</span>\n' +
      '    <p>\n' +
      '      <span>Касир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id термінала:</span>\n' +
      '      <code>__TERM_ID__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>__MERCH_ID__</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: __REC_NUM__</code>\n' +
      '    <span class="bill-block__text--bold">__TYPE_OPERATION_TEXT__</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сума:</span>\n' +
      '      <code class="bill-block__text--bold">__AMOUNT__ UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>__IPS__</span>\n' +
      '      <span>__TYPE_OPERATION_CODE__</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>__PAN_MASKA__</code>\n' +
      '      <span>__EXP_DATE__</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">__RESP_TEXT__</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код відповіді</span>\n' +
      '      <code>__RESP_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизації</span>\n' +
      '      <code>__AUTH_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер посилання</span>\n' +
      '      <code>__RRN__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>__SEG_NUM__</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата __TRANSACTION_DATE__</code>\n' +
      '      <code>Час __TRANSACTION_TIME__</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Дякуємо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
      'nameBank': {'key': '__NAME_BANK__', 'value': 'АЛЬФА'},
      'mName': {'key': '__M_NAME__', 'value': 'ТОВ "СОНЕЧКО"'},
      'mLocation': {'key': '__M_LOCATION__', 'value': 'м. Києв, вул. Гарматна, 51 А'},
      'termId': {'key': '__TERM_ID__', 'value': 'cb22bb63'},
      'merchId': {'key': '__MERCH_ID__', 'value': 'acace7e2c7ab'},
      'recNum': {'key': '__REC_NUM__', 'value': '000964'},
      'typeOperation': {'key': '__TYPE_OPERATION_CODE__', 'value': '26'},
      'typeOperationPayTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'оплата'},
      'typeOperationRefundTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'повернення'},
      'amount': {'key': '__AMOUNT__', 'value': 99.99},
      'ips': {'key': '__IPS__', 'value': 'MasterCard'},
      'panMaska': {'key': '__PAN_MASKA__', 'value': '1234************3456'},
      'expDate': {'key': '__EXP_DATE__', 'value': '19/08'},
      'resp': {'key': '__RESP_CODE__', 'value': '00'},
      'respSuccessTxt': {'key': '__RESP_TEXT__', 'value': 'успішно'},
      'respFailureTxt': {'key': '__RESP_TEXT__', 'value': 'неуспішно'},
      'authCode': {'key': '__AUTH_CODE__', 'value': '123456'},
      'rrn': {'key': '__RRN__', 'value': '1857456215'},
      'seqNum': {'key': '__SEG_NUM__', 'value': 10000002},
      'transactionDate': {'key': null, 'value': '2019-08-02T09:56:31.828+0000'},
      'transactionDateForm': {'key': '__TRANSACTION_DATE__', 'value': 'dd/MM/yyyy'},
      'transactionTimeForm': {'key': '__TRANSACTION_TIME__', 'value': 'hh:mm:ss'}
    },
    {
      'id': 3,
      'templateName': 'Русская версия',
      'templateStyle': 'body {\n' +
      '  font-size: 95%;\n' +
      '}\n' +
      'code {\n' +
      '  font-size: 100%;\n' +
      '  color: #000000;\n' +
      '}\n' +
      '*{\n' +
      '  margin: 0;\n' +
      '  box-sizing: border-box;\n' +
      '}\n' +
      'li {\n' +
      '  list-style: none;\n' +
      '}\n' +
      'a {\n' +
      '  text-decoration: none;\n' +
      '}\n' +
      '.bill-block{\n' +
      '  display: flex;\n' +
      '  font-family: \'Roboto\', sans-serif;\n' +
      '  text-align: center;\n' +
      '  text-transform: uppercase;\n' +
      '  height: 70vh;\n' +
      '  position: relative;\n' +
      '}\n' +
      '.bill-block>div{\n' +
      '  margin: auto;\n' +
      '}\n' +
      '.bill-block>div>p{\n' +
      '  display: flex;\n' +
      '  justify-content: space-between;\n' +
      '}\n' +
      '.bill-block>div>span{\n' +
      '  display: block\n' +
      '}\n' +
      '.bill-block__text--borderBig{\n' +
      '  margin-bottom: 20px;\n' +
      '}\n' +
      '.bill-block__text--borderSmall{\n' +
      '  margin-bottom: 10px;\n' +
      '}\n' +
      '.bill-block__text--bold{\n' +
      '  font-weight: bold;\n' +
      '  font-size: 1.2rem;\n' +
      '}\n' +
      '.bill-block__text--result{\n' +
      '  background-color: #000000;\n' +
      '  color: #fff;\n' +
      '}\n' +
      '.bill-block__text--footerCenter {\n' +
      '  font-size: 12px;\n' +
      '  text-transform: none;\n' +
      '}',
      'templateBody': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>__NAME_BANK__</span>\n' +
      '    <span>__M_NAME__</span>\n' +
      '    <span class="bill-block__text--borderBig">__M_LOCATION__</span>\n' +
      '    <p>\n' +
      '      <span>Кассир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id терминала:</span>\n' +
      '      <code>__TERM_ID__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>__MERCH_ID__</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: __REC_NUM__</code>\n' +
      '    <span class="bill-block__text--bold">__TYPE_OPERATION_TEXT__</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сумма:</span>\n' +
      '      <code class="bill-block__text--bold">__AMOUNT__ UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>ips</span>\n' +
      '      <span>__TYPE_OPERATION_CODE__</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>__PAN_MASKA__</code>\n' +
      '      <span>__EXP_DATE__</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">__RESP_TEXT__</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код ответа</span>\n' +
      '      <code>__RESP_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизации</span>\n' +
      '      <code>__AUTH_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер отправки</span>\n' +
      '      <code>__RRN__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>__SEG_NUM__</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата __TRANSACTION_DATE__</code>\n' +
      '      <code>Час __TRANSACTION_TIME__</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Спасибо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
      'nameBank': {'key': '__NAME_BANK__', 'value': 'АЛЬФА'},
      'mName': {'key': '__M_NAME__', 'value': 'ООО "СОНЕЧКО"'},
      'mLocation': {'key': '__M_LOCATION__', 'value': 'г. Киев, ул. Гарматная, 51 А'},
      'termId': {'key': '__TERM_ID__', 'value': 'cb22bb63'},
      'merchId': {'key': '__MERCH_ID__', 'value': 'acace7e2c7ab'},
      'recNum': {'key': '__REC_NUM__', 'value': '000964'},
      'typeOperation': {'key': '__TYPE_OPERATION_CODE__', 'value': '26'},
      'typeOperationPayTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'оплата'},
      'typeOperationRefundTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'возврат'},
      'amount': {'key': '__AMOUNT__', 'value': 99.99},
      'ips': {'key': '__IPS__', 'value': 'MasterCard'},
      'panMaska': {'key': '__PAN_MASKA__', 'value': '1234************3456'},
      'expDate': {'key': '__EXP_DATE__', 'value': '19/08'},
      'resp': {'key': '__RESP_CODE__', 'value': '00'},
      'respSuccessTxt': {'key': '__RESP_TEXT__', 'value': 'успешно'},
      'respFailureTxt': {'key': '__RESP_TEXT__', 'value': 'неуспешно'},
      'authCode': {'key': '__AUTH_CODE__', 'value': '123456'},
      'rrn': {'key': '__RRN__', 'value': '1857456215'},
      'seqNum': {'key': '__SEG_NUM__', 'value': 10000002},
      'transactionDate': {'key': null, 'value': '2019-08-02T09:56:31.828+0000'},
      'transactionDateForm': {'key': '__TRANSACTION_DATE__', 'value': 'dd/MM/yyyy'},
      'transactionTimeForm': {'key': '__TRANSACTION_TIME__', 'value': 'hh:mm:ss'}
    }
  ];

  merchants = {
    "content": [
      {
        "merchantId": "d7f08eab-544a-4b69-a7e8-a2e90f7d79fe",
        "merchantName": "COFEE SHOP VESELKA",
        "merchantLocation": "25-A PRORIZNA ST.",
        "taxId": 1235847895,
        "mcc": 6012,
        "acquirerId": "42562801"
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
      "unpaged": false,
      "paged": true
    },
    "totalElements": 1,
    "last": true,
    "totalPages": 1,
    "first": true,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "numberOfElements": 1,
    "size": 20,
    "number": 0,
    "empty": false
  };

  products = [
    {
      'productId': 'P01',
      'productName': 'Только Visa',
      'idMps': 'MPS01',
      'symbolMps': 'V',
      'startRange': 400000000000000,
      'endRange': 499999999999999,
      'description': 'Прием только карт Visa...',
      'host': '0.0.0.0'
    },
    {
      'productId': 'P02',
      'productName': 'Только MasterCard',
      'idMps': 'MPS02',
      'symbolMps': 'M',
      'startRange': 500000000000000,
      'endRange': 599999999999999,
      'description': 'Прием только карт MasterCard...',
      'host': '0.0.0.0'
    }
  ];

  productNames: any = [
    'Только Visa',
    'Только MasterCard'
  ];

  symbolChoices: any = [
    {'key':'Y', 'value':'&#x2714;'},
    {'key':'N', 'value':'&#x2718;'}
  ];

  allAttestationActionNames: any = [
    'Блокировка на устройство',
    'Блокировка на транзакцию',
    'PIN блокировка',
    'Manual блокировка',
    'QR блокировка',
    'NFC блокировка',
    'Нет блокировки'
  ];

  allAttestationActions: any = [
    {'key':'BLOCK_DEVICE', 'value':'Блокировка на устройство', 'name':'deviceBlock', 'shortName':'BLD'},
    {'key':'BLOCK_TRANSACTION', 'value':'Блокировка на транзакцию', 'name':'transactionBlock', 'shortName':'BLT'},
    {'key':'BLOCK_PIN', 'value':'PIN блокировка', 'name':'pinBlock', 'shortName':'BLP'},
    {'key':'BLOCK_MANUAL', 'value':'Manual блокировка', 'name':'manualBlock', 'shortName':'BLM'},
    {'key':'BLOCK_QR', 'value':'QR блокировка', 'name':'qrBlock', 'shortName':'BLQR'},
    {'key':'BLOCK_NFC', 'value':'NFC блокировка', 'name':'nfcBlock', 'shortName':'BLN'},
    {'key':'NO_BLOCK', 'value':'Нет блокировки', 'name':'noBlock', 'shortName':'NB'}
  ];

  allAttestationThreads: any = [
    {'key':'DEBUG', 'value':'Тестирование приложения', 'name':'debug'},
    {'key':'EMULATOR', 'value':'Эмуляция приложения', 'name':'emulator'},
    {'key':'ROOT', 'value':'Права приложения', 'name':'root'},
    {'key':'CHANNEL_INTEGRITY', 'value':'Целостность каналов', 'name':'channelIntegrity'},
    {'key':'GEO_POSITION', 'value':'Гео-позиция', 'name':'geoPosition'},
    {'key':'VELOCITY_CHECK', 'value':'Частота транзакций', 'name':'velocity'},
    {'key':'INTEGRITY', 'value':'', 'name':''}
  ];

  takeTerminalStatuses: any = [
    {'key': 'ACTIVE', 'value': 'Активный', 'shortValue': 'Активный', 'name': 'active'},
    {'key': 'BLOCK_SYSTEM', 'value': 'Заблокировано системой', 'shortValue': 'Заблокиро...', 'name': 'blockSystem'},
    {'key': 'BLOCK_ATTESTATION', 'value': 'Заблокировано аттестацией ', 'shortValue': 'Заблокиро...', 'name': 'blockAttestation'},
    {'key': 'BLOCK_BANK', 'value': 'Заблокировано банком', 'shortValue': 'Заблокиро...', 'name': 'blockBank'},
    {'key': 'BLOCK_MANUAL', 'value': 'Заблокировано менеджером', 'shortValue': 'Заблокиро...', 'name': 'blockManual'},
    {'key': 'BLOCK_CLIENT', 'value': 'Заблокировано клиентом', 'shortValue': 'Заблокиро...', 'name': 'blockClient'}

  ];

  statusChoices: any = [
    {'key':'Y', 'value':'Включен'},
    {'key':'N', 'value':'Отключен'}
  ];

  attestationActions = [
    {
      "deviceBlock": 5,
      "transactionBlock": 4,
      "pinBlock": 3,
      "manualBlock": 1,
      "qrBlock": 1,
      "nfcBlock": 2,
      "noBlock": 0
    }
  ];

  attestationThreads = [
    {
      "debug": "deviceBlock",
      "emulator": "nfcBlock",
      "root": "nfcBlock",
      "channelIntegrity": "transactionBlock",
      "geoPosition": "manualBlock",
      "velocity": "pinBlock"
    }
  ];

  attestationThreadlogs = {
    "content": [
      {
        "id": "01",
        "debug": "Y",
        "emulator": "Y",
        "root": "N",
        "channelIntegrity": "Y",
        "integrity": "N",
        "geoPosition": "N",
        "velocity": "N",
        "attestationActions": [
          'Блокировка на устройство',
          'Блокировка на транзакцию'
        ],
        "enabled": "Y"
      },
      {
        "id": "02",
        "debug": "Y",
        "emulator": "Y",
        "root": "N",
        "channelIntegrity": "N",
        "integrity": "N",
        "geoPosition": "Y",
        "velocity": "Y",
        "attestationActions": [
          'PIN блокировка',
          'Manual блокировка'
        ],
        "enabled": "Y"
      },
      {
        "id": "03",
        "debug": "Y",
        "emulator": "Y",
        "root": "Y",
        "channelIntegrity": "N",
        "integrity": "N",
        "geoPosition": "Y",
        "velocity": "Y",
        "attestationActions": [
          'PIN блокировка',
          'Manual блокировка',
          'QR блокировка',
          'NFC блокировка'
        ],
        "enabled": "Y"
      },
      {
        "id": "04",
        "debug": "N",
        "emulator": "N",
        "root": "Y",
        "channelIntegrity": "N",
        "integrity": "N",
        "geoPosition": "Y",
        "velocity": "N",
        "attestationActions": [
          'Нет блокировки'
        ],
        "enabled": "N"
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
      "unpaged": false,
      "paged": true
    },
    "totalElements": 4,
    "last": true,
    "totalPages": 1,
    "first": true,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "numberOfElements": 4,
    "size": 20,
    "number": 0,
    "empty": false
  };

  merchantMessages = [
    // {
    //   'merchantId': null,
    //   'text': null,
    //   'notifyAction': null
    // }
  ];

  terminalMessages = [
    // {
    //   'terminalId': null,
    //   'text': null,
    //   'notifyAction': null
    // }
  ];

  messageTemplate = {
    'text': null
  };

  onSubmitMessage = {
    'disabled': false
  };

  onCreateTemplateMessage = {
    'disabled': false
  };

  terminalMessageAll = {
    'checked': false
  };

  merchantMessageAll = {
    'checked': false
  };

  constructor() { }

  public findAllTerminals(): {content, pageable, totalElements, last, totalPages, first, sort, numberOfElements, size, number, empty} {
    return this.terminals;
  }

  public updateTerminal(terminal: {content, pageable, totalElements, last, totalPages, first, sort, numberOfElements, size, number, empty}) {
    //   this.terminals.push(terminal);
  }

  public findAllServiceGroups():Array<{groupNumber, groupName, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, allowedLanguages}> {
    return this.terminalGroups;
  }

  public createServiceGroup(terminalGroup: {groupNumber, groupName, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, allowedLanguages}) {
    // this.terminals.push(terminalGroup);
  }

  updateServiceGroup(terminalGroup: {groupNumber, groupName, opPurchase, opReversal, opRefund, manual, pin, geoPosition, limitVisa, limitMc, limitProstir, visaAccepted, mcAccepted, prostirAccepted, receiptTemplate, allowedLanguages}) {
    // this.terminals.push(terminalGroup);
  }

  public findAllTransactions():{content, pageable, last, totalPages, totalElements, first, sort, numberOfElements, size, number, empty} {
    return this.transactions;
  }

  public getPanMaskeds():Array<{id, beginMask, endMask, maskSymbol}> {
    return this.panMaskeds;
  }

  public getAllowedLanguages():Array<{number, languageId}> {
    return this.allowedLanguages;
  }

  public getBanks():Array<{code, bankName}> {
    return this.banks;
  }

  public getCities():Array<{key, value}> {
    return this.cities;
  }

  public getTakeChoices():Array<{key, value}> {
    return this.takeChoices;
  }

  public getTakeChoiceActions():Array<{key, value}> {
    return this.takeChoiceActions;
  }

  public getTakeCurrencies():Array<{code, letterCode}> {
    return this.takeCurrencies;
  }

  public getTakeVelocityTimeUnits():Array<{key, value}> {
    return this.takeVelocityTimeUnits;
  }

  public getAllAllowedLanguages() {
    return this.allAllowedLanguages;
  }

  public getAllAttestation() {
    return this.allAttestation;
  }

  public getBasicReceiptSendChannels() {
    return this.basicReceiptSendChannels;
  }

  public getDevices():Array<{appId, appStatus, appVersion, deviceFingerprint, deviceName, deviceSn, deviceStatus, imei, initDate, osVersion, serialNumber}> {
    return this.devices;
  }

  public findAllIpsCardGroups():Array<{mpsId, mpsName, firsNumber, symbol, limit}> {
    return this.ipsCardGroups;
  }

  public createIpsCardGroup(ipsCardGroup: {mpsId, mpsName, firsNumber, symbol, limit}) {
    ipsCardGroup.mpsId = 'MPS0' + this.randomString(1, '123456789');
    this.ipsCardGroups.push(ipsCardGroup);
  }

  public updateIpsCardGroup(ipsCardGroup: {mpsId, mpsName, firsNumber, symbol, limit}) {
    for (let i = 0; i < this.ipsCardGroups.length; i++) {
      if (this.ipsCardGroups[i].mpsId === ipsCardGroup.mpsId) {
        this.ipsCardGroups[i].mpsName = ipsCardGroup.mpsName;
        this.ipsCardGroups[i].firsNumber = ipsCardGroup.firsNumber;
        this.ipsCardGroups[i].symbol = ipsCardGroup.symbol;
        this.ipsCardGroups[i].limit = ipsCardGroup.limit;
      }
    }
  }

  public findAllReceiptTemplates():Array<{id, templateName, templateStyle, templateBody, nameBank, mName, mLocation, termId, merchId, recNum, typeOperation, typeOperationPayTxt, typeOperationRefundTxt, amount, ips, panMaska, expDate, resp, respSuccessTxt, respFailureTxt, authCode, rrn, seqNum, transactionDate, transactionDateForm, transactionTimeForm}> {
    return this.receiptTemplates;
  }

  public createReceiptTemplate(receiptTemplate: {id, templateName, templateStyle, templateBody, nameBank, mName, mLocation, termId, merchId, recNum, typeOperation, typeOperationPayTxt, typeOperationRefundTxt, amount, ips, panMaska, expDate, resp, respSuccessTxt, respFailureTxt, authCode, rrn, seqNum, transactionDate, transactionDateForm, transactionTimeForm}) {
    receiptTemplate.id = this.receiptTemplates.length + 1;
    this.receiptTemplates.push(receiptTemplate);
  }

  public updateReceiptTemplate(receiptTemplate: {id, templateName, templateStyle, templateBody, nameBank, mName, mLocation, termId, merchId, recNum, typeOperation, typeOperationPayTxt, typeOperationRefundTxt, amount, ips, panMaska, expDate, resp, respSuccessTxt, respFailureTxt, authCode, rrn, seqNum, transactionDate, transactionDateForm, transactionTimeForm}) {
    for (let i = 0; i < this.receiptTemplates.length; i++) {
      if (this.receiptTemplates[i].id === receiptTemplate.id) {
        console.info(receiptTemplate);
        this.receiptTemplates[i].templateName = receiptTemplate.templateName;
        this.receiptTemplates[i].templateStyle = receiptTemplate.templateStyle;
        this.receiptTemplates[i].templateBody = receiptTemplate.templateBody;
        this.receiptTemplates[i].nameBank = receiptTemplate.nameBank;
        this.receiptTemplates[i].mName = receiptTemplate.mName;
        this.receiptTemplates[i].mLocation = receiptTemplate.mLocation;
        this.receiptTemplates[i].termId = receiptTemplate.termId;
        this.receiptTemplates[i].merchId = receiptTemplate.merchId;
        this.receiptTemplates[i].recNum = receiptTemplate.recNum;
        this.receiptTemplates[i].typeOperation = receiptTemplate.typeOperation;
        this.receiptTemplates[i].typeOperationPayTxt = receiptTemplate.typeOperationPayTxt;
        this.receiptTemplates[i].typeOperationRefundTxt = receiptTemplate.typeOperationRefundTxt;
        this.receiptTemplates[i].amount = receiptTemplate.amount;
        this.receiptTemplates[i].ips = receiptTemplate.ips;
        this.receiptTemplates[i].panMaska = receiptTemplate.panMaska;
        this.receiptTemplates[i].expDate = receiptTemplate.expDate;
        this.receiptTemplates[i].resp = receiptTemplate.resp;
        this.receiptTemplates[i].respSuccessTxt = receiptTemplate.respSuccessTxt;
        this.receiptTemplates[i].respFailureTxt = receiptTemplate.respFailureTxt;
        this.receiptTemplates[i].authCode = receiptTemplate.authCode;
        this.receiptTemplates[i].rrn = receiptTemplate.rrn;
        this.receiptTemplates[i].seqNum = receiptTemplate.seqNum;
        this.receiptTemplates[i].transactionDate = receiptTemplate.transactionDate;
        this.receiptTemplates[i].transactionDateForm = receiptTemplate.transactionDateForm;
        this.receiptTemplates[i].transactionTimeForm = receiptTemplate.transactionTimeForm;
      }
    }
  }

  public findAllMerchants(): {content, pageable, totalElements, last, totalPages, first, sort, numberOfElements, size, number, empty} {
    return this.merchants;
  }

  public findAllProducts():Array<{productId, productName, idMps, symbolMps, startRange, endRange, description, host}> {
    return this.products;
  }

  public createProduct(product: {productId, productName, idMps, symbolMps, startRange, endRange, description, host}) {
    product.productId = 'P0' + this.randomString(1, '123456789');
    console.log(product);
    this.products.push(product);
    this.productNames.push(product.productName);
  }

  public getAllProductNames() {
    return this.productNames;
  }

  public updateProduct(product: {productId, productName, idMps, symbolMps, startRange, endRange, description, host}) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].productId === product.productId) {
        this.products[i].productName = product.productName;
        this.products[i].idMps = product.idMps;
        this.products[i].symbolMps = product.symbolMps;
        this.products[i].startRange = product.startRange;
        this.products[i].endRange = product.endRange;
        this.products[i].description = product.description;
        this.products[i].host = product.host;
      }
    }
  }

  public getSymbolChoices():Array<{key, value}> {
    return this.symbolChoices;
  }

  public getAllAttestationActionNames() {
    return this.allAttestationActionNames;
  }

  public getAllAttestationActions() {
    return this.allAttestationActions;
  }

  public getAllAttestationThreads() {
    return this.allAttestationThreads;
  }

  public getTakeTerminalStatuses() {
    return this.takeTerminalStatuses;
  }

  public getStatusChoices():Array<{key, value}> {
    return this.statusChoices;
  }

  public getAttestationActions():Array<{deviceBlock, transactionBlock, pinBlock, manualBlock, qrBlock, nfcBlock, noBlock}> {
    return this.attestationActions;
  }

  public updateAttestationActions(attestationActions: {deviceBlock, transactionBlock, pinBlock, manualBlock, qrBlock, nfcBlock, noBlock}) {
    console.info(attestationActions);
    this.attestationActions[0].deviceBlock = attestationActions.deviceBlock;
    this.attestationActions[0].transactionBlock = attestationActions.transactionBlock;
    this.attestationActions[0].pinBlock = attestationActions.pinBlock;
    this.attestationActions[0].manualBlock = attestationActions.manualBlock;
    this.attestationActions[0].qrBlock = attestationActions.qrBlock;
    this.attestationActions[0].nfcBlock = attestationActions.nfcBlock;
    this.attestationActions[0].noBlock = attestationActions.noBlock;
  }

  public getAttestationThreads():Array<{debug, emulator, root, channelIntegrity, geoPosition, velocity}> {
    return this.attestationThreads;
  }

  public updateAttestationThreads(attestationThreads: {debug, emulator, root, channelIntegrity, geoPosition, velocity}) {
    console.info(attestationThreads);
    this.attestationThreads[0].debug = attestationThreads.debug;
    this.attestationThreads[0].emulator = attestationThreads.emulator;
    this.attestationThreads[0].root = attestationThreads.root;
    this.attestationThreads[0].channelIntegrity = attestationThreads.channelIntegrity;
    this.attestationThreads[0].geoPosition = attestationThreads.geoPosition;
    this.attestationThreads[0].velocity = attestationThreads.velocity;
  }

  public findAllAttestationThreadlogs(): {content, pageable, totalElements, last, totalPages, first, sort, numberOfElements, size, number, empty} {
    return this.attestationThreadlogs;
  }

  public getMerchantMessages():Array<{merchantId, text, notifyAction}> {
    return this.merchantMessages;
  }

  /**
   * @see https://stackoverflow.com/questions/40462369/remove-item-from-stored-array-in-angular-2
   */
  public updateMerchantMessage(merchantMessages: any[]) {
    console.info(merchantMessages);

    // if (0 < this.merchantMessages.length) {
    //   const newMerchantMessages: any = []
    //   for (let m = 0; m < merchantMessages.length; m++) {
    //     const index = this.merchantMessages.findIndex(merchantMessage => merchantMessage.merchantId === merchantMessages[m].merchantId);
    //     if (index === -1) newMerchantMessages.push(merchantMessages[m]);
    //   }
    //   for (let n = 0; n < newMerchantMessages.length; n++) this.merchantMessages.push(newMerchantMessages[n]);
    // } else {
    //   this.merchantMessages = merchantMessages;
    // }

    if (0 < this.merchantMessages.length) {
      for (let i = 0; i < merchantMessages.length; i++) {
        const index = this.merchantMessages.findIndex(merchantMessage => merchantMessage.merchantId === merchantMessages[i].merchantId);
        if (index === -1) setTimeout(() => this.merchantMessages.push(merchantMessages[i]));
      }
    } else this.merchantMessages = merchantMessages;
  }

  public getTerminalMessages():Array<{terminalId, text, notifyAction}> {
    return this.terminalMessages;
  }

  /**
   * @see https://stackoverflow.com/questions/40462369/remove-item-from-stored-array-in-angular-2
   */
  public updateTerminalMessage(terminalMessages: any[]) {
    console.info(terminalMessages);

    // if (0 < this.terminalMessages.length) {
    //   const newTerminalMessages: any = []
    //   for (let t = 0; t < terminalMessages.length; t++) {
    //     const index = this.terminalMessages.findIndex(merchantMessage => merchantMessage.terminalId === terminalMessages[t].terminalId);
    //     if (index === -1) newTerminalMessages.push(terminalMessages[t]);
    //   }
    //   for (let n = 0; n < newTerminalMessages.length; n++) this.terminalMessages.push(newTerminalMessages[n]);
    // } else {
    //   this.terminalMessages = terminalMessages;
    // }

    if (0 < this.terminalMessages.length) {
      for (let i = 0; i < terminalMessages.length; i++) {
        const index = this.terminalMessages.findIndex(merchantMessage => merchantMessage.terminalId === terminalMessages[i].terminalId);
        if (index === -1) setTimeout(() => this.terminalMessages.push(terminalMessages[i]));
      }
    } else this.terminalMessages = terminalMessages;
  }

  public getMessageTemplate(): {text} {
    return this.messageTemplate;
  }

  public updateMessageTemplate(messageTemplate: {text}) {
    console.info(messageTemplate);
    return this.messageTemplate.text = messageTemplate.text;
  }

  public getOnSubmitMessage(): {disabled} {
    return this.onSubmitMessage;
  }

  public updateOnSubmitMessage(onSubmitMessage: {disabled}) {
    console.info(onSubmitMessage);
    return this.onSubmitMessage.disabled = onSubmitMessage.disabled;
  }

  public getOnCreateTemplateMessage(): {disabled} {
    return this.onCreateTemplateMessage;
  }

  public updateOnCreateTemplateMessage(onCreateTemplateMessage: {disabled}) {
    console.info(onCreateTemplateMessage);
    return this.onCreateTemplateMessage.disabled = onCreateTemplateMessage.disabled;
  }

  public getTerminalMessageAll(): {checked} {
    return this.terminalMessageAll;
  }

  public updateTerminalMessageAll(terminalMessageAll: {checked}) {
    console.info(terminalMessageAll);
    return this.terminalMessageAll.checked = terminalMessageAll.checked;
  }

  public getMerchantMessageAll(): {checked} {
    return this.merchantMessageAll;
  }

  public updateMerchantMessageAll(merchantMessageAll: {checked}) {
    console.info(merchantMessageAll);
    return this.merchantMessageAll.checked = merchantMessageAll.checked;
  }

  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
