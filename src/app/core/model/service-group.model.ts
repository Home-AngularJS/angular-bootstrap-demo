/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ServiceGroup {
  groupNumber: any;
  groupName: any;
  productName: any;
  productIds: any;
  opPurchase: any;
  opReversal: any;
  opRefund: any;
  opManual: any;
  opPin: any;
  geoPosition: any;
  receiptTemplate: any;
  receiptTemplateId: any;
  allowedLanguages: any;
  allowedLanguageIds: any;
  oneTransactionLimit: any;
  noPinLimit: any;
}


export function dtoToServiceGroup(src: any) {
  const allowedLanguages: any = [];
  const allowedLanguageIds: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    // allowedLanguages.push({'languageId': src.allowedLanguages[i].languageId}); //allowedLanguages.push(src.allowedLanguages[i].languageId);
    allowedLanguages.push(src.allowedLanguages[i].languageId);
    allowedLanguageIds.push(src.allowedLanguages[i].languageId);
  }

  const productNames: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productNames.push(src.products[i].productName);
  }
  const productIds: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productIds.push(src.products[i].productId);
  }

  const ipsNames: any = [];
  for (let i = 0; i < src.allowedIpsCardGroups.length; i++) {
    ipsNames.push(src.allowedIpsCardGroups[i].ipsName);
  }

  const dest: any = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'productNames': productNames,
    'productIds': productIds,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'opManual': src.opManual,
    'opPin': src.opPin,
    'geoPosition': src.geoPosition,
    'receiptTemplate': src.receiptTemplate,
    'receiptTemplateId': src.receiptTemplate.id,
    'allowedLanguages': allowedLanguages,
    'allowedLanguageIds': allowedLanguageIds,
    'ipsNames': ipsNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
  };
  return dest;
}

export function serviceGroupToDto(src: any) {
  const allowedLanguages: any = [];
  const allowedLanguageIds: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    // allowedLanguages.push({'languageId': src.allowedLanguages[i]});
    allowedLanguages.push(src.allowedLanguages[i].languageId);
    allowedLanguageIds.push(src.allowedLanguages[i]);
  }

  const productNames: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productNames.push(src.products[i].productName);
  }
  const productIds: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productIds.push(src.products[i].productId);
  }

  const ipsNames: any = [];
  for (let i = 0; i < src.allowedIpsCardGroups.length; i++) {
    ipsNames.push(src.allowedIpsCardGroups[i].ipsName);
  }

  const dest = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'productNames': productNames,
    'productIds': productIds,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'opManual': src.opManual,
    'opPin': src.opPin,
    'geoPosition': src.geoPosition,
    'receiptTemplate': src.receiptTemplate,
    'receiptTemplateId': src.receiptTemplate.id,
    'allowedLanguages': allowedLanguages,
    'allowedLanguageIds': allowedLanguageIds,
    'ipsNames': ipsNames,
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
    'opManual': null,
    'opPin': null,
    'geoPosition': null,
    'receiptTemplate': null,
    'receiptTemplateId': null,
    'allowedLanguages': [],
    'allowedLanguageIds': [],
    'oneTransactionLimit': null,
    'noPinLimit': null,
  };
  return dest;
}
