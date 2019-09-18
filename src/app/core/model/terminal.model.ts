import * as moment from 'moment';

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
  manual: any;
  opPurchase: any;
  opRefund: any;
  opReversal: any;
  pin: any;
  receiptTemplate: any;
  merchantId: any;
  merchantName: any;
  merchantLocation: any;
  taxId: any;
  mcc: any;
  acquirerId: any;
  allowedLanguages: any;
  allowedIpsCardGroups: any;
  oneTransactionLimit: any;
  noPinLimit: any;
  opQr: any;
  addData: any;
  receiptSendChannels: any;
  deviceName: any;
}

interface FilterTerminalModel {
  terminalId: any;
  groupNumber: any;
  dateTimeInit: any;
  merchantName: any;
  legalName: any;
}

export function filterTerminalToUrl(src: any) {
  let dest: string = '';

  // console.log('---------------------------')
  // console.log(src)

  if (src.terminalId !== '' && src.terminalId !== null) {
    dest += 'terminalId=' + src.terminalId;
  }
  if (src.groupNumber !== '' && src.groupNumber !== null) {
    if (dest !== '') dest += '&';
    dest += 'groupNumber=' + src.groupNumber;
  }
  if (src.dateTimeInit !== '' && src.dateTimeInit !== null) {
    const dateTimeInit = jsDateToDate(src.dateTimeInit);
    if (dest !== '') dest += '&';
    dest += 'dateTimeInit=' + dateTimeInit;
  }
  if (src.merchantName !== '' && src.merchantName !== null) {
    if (dest !== '') dest += '&';
    dest += 'merchantName=' + src.merchantName;
  }
  if (src.legalName !== '' && src.legalName !== null) {
    if (dest !== '') dest += '&';
    dest += 'legalName=' + src.legalName;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterTerminalEmpty() {
  const dest = {
    'terminalId': null,
    'groupNumber': null,
    'dateTimeInit': null,
    'merchantName': null,
    'legalName': null
  };
  return dest;
}

export function dtoToTerminal(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push(src.allowedLanguages[i].languageId);
  }

  const receiptSendChannels: any = [];
  for (let i = 0; i < src.receiptSendChannels.length; i++) {
    if (src.receiptSendChannels[i].enabled) {
      receiptSendChannels.push(src.receiptSendChannels[i].name);
    }
  }

  const productNames: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productNames.push(src.products[i].productName);
  }

  // console.log('=============================')
  // console.log(src)
  // const dateTimeInit = dateTimeToJsDate(src.dateTimeInit);

  // @see https://blog.jdriven.com/2017/06/typescript-and-es6-import-syntax
  // const dataService: DataService = new DataService();
  // const ipsCardGroups = dataService.findAllIpsCardGroups();
  // console.log(ipsCardGroups)

  const dest: any = {
    'terminalId': src.terminalId,
    'groupNumber': src.groupNumber,
    'configChanged': src.configChanged,
    'dateTimeInit': src.dateTimeInit,
    'legalName': src.merchant.merchantLegalName,
    'geoPosition': src.geoPosition,
    'manual': src.manual,
    'opPurchase': src.opPurchase,
    'opRefund': src.opRefund,
    'opReversal': src.opRefund,
    'pin': src.pin,
    'receiptTemplate': src.receiptTemplate,
    'merchantId': src.merchant.merchantId,
    'merchantName': src.merchant.merchantName,
    'merchantLocation': src.merchant.merchantLocation,
    'taxId': src.merchant.taxId,
    'mcc': src.merchant.mcc,
    'acquirerId': src.merchant.acquirerId,
    'allowedLanguages': allowedLanguages,
    'receiptTemplateId': src.receiptTemplateId,
    'productNames': productNames,
    'ipsNames': src.ipsNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': receiptSendChannels,
    'deviceName': src.deviceName,
  };
  return dest;
}

export function terminalToDto(oldDto: any, src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push({'languageId': src.allowedLanguages[i]});
  }
  const dateTimeInit = dateToDateTime(null, src.dateTimeInit)
  const ipsCardGroupIdList: any = [];
  for (let i = 0; i < src.allowedIpsCardGroups.length; i++) {
    ipsCardGroupIdList.push(src.allowedIpsCardGroups[i].ipsCardGroupId);
  }

  const dest = {
    'terminalId': src.terminalId,
    // 'groupNumber': src.groupNumber,
    'opPurchase': src.opPurchase,
    'opReversal': src.opReversal,
    'opRefund': src.opRefund,
    'manual': src.manual,
    'pin': src.pin,
    'geoPosition': src.geoPosition,
    // 'receiptTemplate': src.receiptTemplate,
    'receiptTemplateId': src.receiptTemplate.id,
    // 'configChanged': src.configChanged,
    // 'dateTimeInit': dateTimeInit,
    'merchant': {
      'merchantId': src.merchantId,
      'merchantName': src.merchantName,
      'merchantLocation': src.merchantLocation,
      'merchantLegalName': src.legalName,
      'taxId': src.taxId,
      'mcc': src.mcc,
      'acquirerId': src.acquirerId
    },
    'allowedLanguages': allowedLanguages,
    // 'allowedIpsCardGroups': src.allowedIpsCardGroups,
    'ipsCardGroupIdList': ipsCardGroupIdList,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': src.receiptSendChannels,
  };
  return dest;
}

export function terminalToUpdate(src: any) {
  const allowedLanguages: any = [];
  for (let i = 0; i < src.allowedLanguages.length; i++) {
    allowedLanguages.push({'languageId': src.allowedLanguages[i]});
  }

  const dest = {
    'allowedLanguages': allowedLanguages,
    'beginMask': src.beginMask,
    'endMask': src.endMask,
    'geoPosition': src.geoPosition,
    'ipsCardGroupIdList': src.ipsCardGroupIdList,
    'manual': src.manual,
    'maskSymbol': src.maskSymbol,
    'noPinLimit': src.noPinLimit,
    'oneTransactionLimit': src.oneTransactionLimit,
    'opPurchase': src.opPurchase,
    'opQr': src.opQr,
    'opRefund': src.opRefund,
    'opReversal': src.opReversal,
    'pin': src.pin,
    'productIdList': src.productIdList,
    'receiptTemplateId': src.receiptTemplateId,
    'addData': src.addData,
    'receiptSendChannelIdList': src.receiptSendChannels
  };
  return dest;
}

/**
 * @see https://www.tutorialspoint.com/typescript/typescript_string_split.htm
 */
function dateToDateTime(oldDateTime: any, newDateTime: any) {
  // console.log('oldDateTime:' + oldDateTime)
  // console.log('newDateTime:' + newDateTime)

  const splitted: string = 'T';
  const formatDate: string = 'YYYY-MM-DDTHH:mm:ss.sssZZ';

  const dtCurr = moment()
    .format(formatDate)
    .split(splitted, 2);

  /**
   * №1 - новая дата, старое время (date+date)
   */
  if (!isEmpty(oldDateTime) && !isEmpty(newDateTime)) {
    const dtNew: any = moment(newDateTime.jsdate)
      .format(formatDate)
      .split(splitted, 2);
    const dtOld: any = oldDateTime.split(splitted, 2);
    return dtNew[0] + splitted + dtOld[1];
  }

  /**
   * №2 - новая дата, текущее время (null+date)
   */
  if (isEmpty(oldDateTime) && !isEmpty(newDateTime)) {
    const dtNew: any = moment(newDateTime.jsdate)
      .format(formatDate)
      .split(splitted, 2);
    return dtNew[0] + splitted + dtCurr[1];
  }

  /**
   * №3 - старая дата, старое время (date+null)
   */
  if (!isEmpty(oldDateTime) && isEmpty(newDateTime)) {
    const dtOld: any = oldDateTime.split(splitted, 2);
    return dtOld[0] + splitted + dtOld[1];
  }

  /**
   * №4 - ничего (null+null)
   */
  return null;
}

function dateTimeToJsDate(dateTime: any) {
  return !isEmpty(dateTime) ? { jsdate: new Date(dateTime) } : null;
}

function jsDateToDate(jsDate: any) {
  const splitted: string = 'T';
  const formatDate: string = 'YYYY-MM-DDTHH:mm:ss.sssZZ';

  if (!isEmpty(jsDate)) {
    const dtNew: any = moment(jsDate.jsdate)
      .format(formatDate)
      .split(splitted, 2);
    return dtNew[0];
  }
  return null;
}

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 */
function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
