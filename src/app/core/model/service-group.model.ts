/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ServiceGroup {
  groupNumber: any;
  groupName: any;
  opPurchase: any;
  opReversal: any;
  opRefund: any;
  manual: any;
  pin: any;
  geoPosition: any;
  receiptTemplate: any;
  allowedLanguages: any;
  visaAccepted: any;
  mcAccepted: any;
  prostirAccepted: any;
  oneTransactionLimit: any;
  noPinLimit: any;
}


export function dtoToServiceGroup(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push(src.allowedLanguages[i].languageId);
  }

  const dest: any = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'manual': src.manual,
    'pin': src.pin,
    'geoPosition': src.geoPosition,
    'receiptTemplate': src.receiptTemplate,
    'allowedLanguages': allowedLanguages,
    'productNames': src.productNames,
    'visaAccepted': src.visaAccepted,
    'mcAccepted': src.mcAccepted,
    'prostirAccepted': src.prostirAccepted,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
  };
  return dest;
}

export function serviceGroupToDto(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push({'languageId': src.allowedLanguages[i]});
  }

  const dest = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'manual': src.manual,
    'pin': src.pin,
    'geoPosition': src.geoPosition,
    'receiptTemplate': src.receiptTemplate,
    'allowedLanguages': allowedLanguages,
    'visaAccepted': src.visaAccepted,
    'mcAccepted': src.mcAccepted,
    'prostirAccepted': src.prostirAccepted,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
  };
  return dest;
}

export function serviceGroupNew() {
  const dest = {
    'groupNumber': null,
    'groupName': null,
    'opPurchase': null,
    'opReversal': null,
    'opRefund': null,
    'manual': null,
    'pin': null,
    'geoPosition': null,
    'receiptTemplate': null,
    'allowedLanguages': [],
    'visaAccepted': null,
    'mcAccepted': null,
    'prostirAccepted': null,
    'oneTransactionLimit': null,
    'noPinLimit': null,
  };
  return dest;
}
