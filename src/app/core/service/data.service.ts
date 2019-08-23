import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  allAllowedLanguages: any = [
    'UKR',
    'RUS',
    'ENG',
    'GEO'
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

  ticketTemplates = [
    {
      'id': 1,
      'ticketName': 'Украинская версия',
      'template': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>name_bank</span>\n' +
      '    <span>m_name</span>\n' +
      '    <span class="bill-block__text--borderBig">m_location</span>\n' +
      '    <p>\n' +
      '      <span>Касир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id термінала:</span>\n' +
      '      <code>term_id</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>merch_id</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: rec_num</code>\n' +
      '    <span class="bill-block__text--bold">type_operation_text</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сума:</span>\n' +
      '      <code class="bill-block__text--bold">amount UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>ips</span>\n' +
      '      <span>type_operation</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>pan_maska</code>\n' +
      '      <span>exp_date</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">resp_code_text</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код відповіді</span>\n' +
      '      <code>resp_code</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизації</span>\n' +
      '      <code>auth_code</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер посилання</span>\n' +
      '      <code>rrn</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>seq_num</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата transaction_date</code>\n' +
      '      <code>Час transaction_time</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Дякуємо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
      'nameBank': 'АЛЬФА',
      'mName': 'ТОВ "СОНЕЧКО"',
      'mLocation': 'м. Києв, вул. Гарматна, 51 А',
      'termId': 'cb22bb63',
      'merchId': 'acace7e2c7ab',
      'recNum': '000964',
      'typeOperation': '26',
      'typeOperationTextSuccess': 'успішно',
      'typeOperationTextNotsuccess': 'неуспішно',
      'amount': 99.99,
      'ips': 'MasterCard',
      'panMaska': '1234************3456',
      'expDate': '19/08',
      'respCode': '00',
      'respCodeTextPayment': 'оплата',
      'respCodeTextReturn': 'повернення',
      'authCode': '123456',
      'rrn': '1857456215',
      'seqNum': 10000002,
      'transactionDate': '2019-08-02T09:56:31.828+0000'
    },
    {
      'id': 10,
      'ticketName': 'Русская версия',
      'template': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>name_bank</span>\n' +
      '    <span>m_name</span>\n' +
      '    <span class="bill-block__text--borderBig">m_location</span>\n' +
      '    <p>\n' +
      '      <span>Кассир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id терминала:</span>\n' +
      '      <code>term_id</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>merch_id</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: rec_num</code>\n' +
      '    <span class="bill-block__text--bold">type_operation_text</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сумма:</span>\n' +
      '      <code class="bill-block__text--bold">amount UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>ips</span>\n' +
      '      <span>type_operation</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>pan_maska</code>\n' +
      '      <span>exp_date</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">resp_code_text</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код ответа</span>\n' +
      '      <code>resp_code</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизации</span>\n' +
      '      <code>auth_code</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер отправки</span>\n' +
      '      <code>rrn</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>seq_num</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата transaction_date</code>\n' +
      '      <code>Час transaction_time</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Спасибо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
      'nameBank': 'АЛЬФА',
      'mName': 'ООО "СОНЕЧКО"',
      'mLocation': 'г. Киев, ул. Гарматная, 51 А',
      'termId': 'cb22bb63',
      'merchId': 'acace7e2c7ab',
      'recNum': '000964',
      'typeOperation': '26',
      'typeOperationTextSuccess': 'успешно',
      'typeOperationTextNotsuccess': 'неуспешно',
      'amount': 99.99,
      'ips': 'MasterCard',
      'panMaska': '1234************3456',
      'expDate': '19/08',
      'respCode': '00',
      'respCodeTextPayment': 'оплата',
      'respCodeTextReturn': 'возврат',
      'authCode': '123456',
      'rrn': '1857456215',
      'seqNum': 10000002,
      'transactionDate': '2019-08-02T09:56:31.828+0000'
    }
  ];

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

  constructor(private http: HttpClient) { }

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

  public getAllAllowedLanguages() {
    return this.allAllowedLanguages;
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

  public findAllTicketTemplates():Array<{id, ticketName, template, nameBank, mName, mLocation, termId, merchId, recNum, amount, ips, panMaska, expDate, respCode, authCode, rrn, seqNum, typeOperation, transactionDate}> {
    return this.ticketTemplates;
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

  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
