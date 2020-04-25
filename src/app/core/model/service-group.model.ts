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
  opQr: any;
  opNfc: any;
  opManual: any;
  opPin: any;
  geoPosition: any;
  receiptTemplateId: any;
  oneTransactionLimit: any;
  noPinLimit: any;
  totalAmountLimit: any;
  totalCountLimit: any;
  totalLimitPeriod: any;
  receiptSendChannels: any;
  currencyCode: any;
  velocityCount: any;
  velocityPeriod: any;
  velocityTimeUnit: any;
  opTips: any;
}


export function dtoToServiceGroup(src: any) {
  const receiptSendChannels: any = [];
  for (let r = 0; r < src.receiptSendChannels.length; r++) {
    if (src.receiptSendChannels[r].enabled) receiptSendChannels.push(src.receiptSendChannels[r].name);
  }

  const ipsCardGroupNames: any = [];
  for (let i = 0; i < src.allowedIpsCardGroups.length; i++) ipsCardGroupNames.push(src.allowedIpsCardGroups[i].ipsName);

  const productIds: any = [];
  for (let i = 0; i < src.products.length; i++) productIds.push(src.products[i].productId);

  const dest: any = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'receiptSendChannels': receiptSendChannels,
    'productIds': productIds,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'opQr': src.opQr,
    'opNfc': src.opNfc,
    'opManual': src.opManual,
    'opPin': src.opPin,
    'geoPosition': src.geoPosition,
    'receiptTemplateId': src.receiptTemplate.id,
    'ipsCardGroupNames': ipsCardGroupNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'totalAmountLimit': src.totalAmountLimit,
    'totalCountLimit': src.totalCountLimit,
    'totalLimitPeriod': src.totalLimitPeriod,
    'currencyCode': src.currency.code,
    'velocityCount': src.velocityCount,
    'velocityPeriod': src.velocityPeriod,
    'velocityTimeUnit': src.velocityTimeUnit,
    'opTips': src.opTips,
  };
  return dest;
}

export function serviceGroupToUpdate(src: any) {
  const dest = {
    'groupNumber': src.groupNumber,
    'groupName': src.groupName,
    'productIdList': src.productIds,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'opQr': src.opQr,
    'opNfc': src.opNfc,
    'opManual': src.opManual,
    'opPin': src.opPin,
    'geoPosition': src.geoPosition,
    'receiptTemplateId': src.receiptTemplateId,
    'ipsCardGroupIdList': src.ipsCardGroupIdList,
    'receiptSendChannelIdList': src.receiptSendChannelIdList,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'totalAmountLimit': src.totalAmountLimit,
    'totalCountLimit': src.totalCountLimit,
    'totalLimitPeriod': src.totalLimitPeriod,
    'currencyCode': src.currencyCode,
    'velocityCount': src.velocityCount,
    'velocityPeriod': src.velocityPeriod,
    'velocityTimeUnit': src.velocityTimeUnit,
    'opTips': src.opTips
  };
  return dest;
}

export function serviceGroupNew() {
  const dest = {
    'groupNumber': null,
    'groupName': null,
    'receiptSendChannels': [],
    'productIds': [],
    'opPurchase': null,
    'opReversal': null,
    'opRefund': null,
    'opQr': null,
    'opNfc': null,
    'opManual': null,
    'opPin': null,
    'geoPosition': null,
    'receiptTemplateId': null,
    'ipsCardGroupNames': [],
    'oneTransactionLimit': null,
    'noPinLimit': null,
    'totalAmountLimit': null,
    'totalCountLimit': null,
    'totalLimitPeriod': null,
    'currencyCode': null,
    'velocityCount': null,
    'velocityPeriod': null,
    'velocityTimeUnit': null,
    'opTips': null
  };
  return dest;
}

export function allowedIpsCardGroupsToDto(dto: any, src: any) {
  const ipsCardGroupIdList: any = [];
  for (let i = 0; i < dto.length; i++) {
    const ipsCardGroupIdEntity = dto[i];
    for (let j = 0; j < src.length; j++) {
      if (ipsCardGroupIdEntity.ipsName === src[j]) ipsCardGroupIdList.push(ipsCardGroupIdEntity.ipsCardGroupId);
    }
  }
  return ipsCardGroupIdList;
}
