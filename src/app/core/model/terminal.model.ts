/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface Terminal {
  terminalId: any;
  groupNumber: any;
  configChanged: any;
  dateTimeInit: any;
  legalName: any;
  geoPosition: any;
  limitMc: any;
  limitProstir: any;
  limitVisa: any;
  manual: any;
  mcAccepted: any;
  opPurchase: any;
  opRefund: any;
  opReversal: any;
  pin: any;
  prostirAccepted: any;
  receiptTemplate: any;
  visaAccepted: any;
  merchantId: any;
  merchantName: any;
  merchantLocation: any;
  taxId: any;
  mcc: any;
  acquirerId: any;
  allowedLanguages: any;
}


export function dtoToTerminal(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push(src.allowedLanguages[i].languageId);
  }

  const dest: any = {
    "terminalId": src.terminalId,
    "groupNumber": src.groupNumber,
    "configChanged": src.configChanged,
    "dateTimeInit": src.dateTimeInit,
    "legalName": src.merchant.merchantLegalName,
    "geoPosition": src.geoPosition,
    "limitMc": src.limitMc,
    "limitProstir": src.limitProstir,
    "limitVisa": src.limitVisa,
    "manual": src.manual,
    "mcAccepted": src.mcAccepted,
    "opPurchase": src.opPurchase,
    "opRefund": src.opRefund,
    "opReversal": src.opRefund,
    "pin": src.pin,
    "prostirAccepted": src.prostirAccepted,
    "receiptTemplate": src.receiptTemplate,
    "visaAccepted": src.visaAccepted,
    "merchantId": src.merchant.merchantId,
    "merchantName": src.merchant.merchantName,
    "merchantLocation": src.merchant.merchantLocation,
    "taxId": src.merchant.taxId,
    "mcc": src.merchant.mcc,
    "acquirerId": src.merchant.acquirerId,
    "allowedLanguages": allowedLanguages,
    "beginMask": src.beginMask,
    "endMask": src.endMask,
    "maskSymbol": src.maskSymbol,
    "productId": src.productId,
  };
  return dest;
}

export function terminalToDto(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push({"languageId": src.allowedLanguages[i]});
  }

  const dest = {
    "terminalId": src.terminalId,
    "groupNumber": src.groupNumber,
    "opPurchase": src.opPurchase,
    "opReversal": src.opReversal,
    "opRefund": src.opRefund,
    "manual": src.manual,
    "pin": src.pin,
    "geoPosition": src.geoPosition,
    "limitVisa": src.limitVisa,
    "limitMc": src.limitMc,
    "limitProstir": src.limitProstir,
    "visaAccepted": src.visaAccepted,
    "mcAccepted": src.mcAccepted,
    "prostirAccepted": src.prostirAccepted,
    "receiptTemplate": src.receiptTemplate,
    "configChanged": src.configChanged,
    "dateTimeInit": src.dateTimeInit,
    "merchant": {
      "merchantId": src.merchantId,
      "merchantName": src.merchantName,
      "merchantLocation": src.merchantLocation,
      "merchantLegalName": src.legalName,
      "taxId": src.taxId,
      "mcc": src.mcc,
      "acquirerId": src.acquirerId
    },
    "allowedLanguages": allowedLanguages,
    "beginMask": src.beginMask,
    "endMask": src.endMask,
    "maskSymbol": src.maskSymbol
  };
  return dest;
}
