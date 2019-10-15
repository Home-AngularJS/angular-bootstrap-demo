import * as moment from 'moment';
import { DataService } from '../../core/service/data.service';

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
  bankName: any;
  allowedLanguages: any;
  allowedIpsCardGroups: any;
  oneTransactionLimit: any;
  noPinLimit: any;
  totalAmountTerminalLimit: any;
  opQr: any;
  addData: any;
  receiptSendChannels: any;
  deviceName: any;
  zreportTime: any;
  zreportEnabledAll: any;
  nfc: any;
  block: any;
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

  if (src.terminalId !== '' && src.terminalId !== null && src.terminalId !== undefined) {
    dest += 'terminalId=' + src.terminalId;
  }
  if (src.groupNumber !== '' && src.groupNumber !== null && src.groupNumber !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'groupNumber=' + src.groupNumber;
  }
  if (src.dateTimeInit !== '' && src.dateTimeInit !== null && src.dateTimeInit !== undefined) {
    const dateTimeInit = jsDateToDate(src.dateTimeInit);
    if (dest !== '') dest += '&';
    dest += 'dateTimeInit=' + dateTimeInit;
  }
  if (src.merchantName !== '' && src.merchantName !== null && src.merchantName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantName=' + src.merchantName;
  }
  if (src.legalName !== '' && src.legalName !== null && src.legalName !== undefined) {
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
  for (let r = 0; r < src.receiptSendChannels.length; r++) {
    if (src.receiptSendChannels[r].enabled) {
      receiptSendChannels.push(src.receiptSendChannels[r].name);
    }
  }
  // const labelBasic = ' (базовый)';
  // const dataService: DataService = new DataService();
  // const basicReceiptSendChannels = dataService.getBasicReceiptSendChannels();
  // const receiptSendChannels: any = [];
  // for (let r = 0; r < src.receiptSendChannels.length; r++) {
  //   if (src.receiptSendChannels[r].enabled) {
  //     for (let b = 0; b < basicReceiptSendChannels.length; b++) {
  //       if (src.receiptSendChannels[r].name === basicReceiptSendChannels[b]) {
  //         receiptSendChannels.push(src.receiptSendChannels[r].name + labelBasic);
  //       } else {
  //         receiptSendChannels.push(src.receiptSendChannels[r].name);
  //       }
  //     }
  //   }
  // }

  const productNames: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productNames.push(src.products[i].productName);
  }

  if (!src.totalAmountTerminalLimit) {
    src.totalAmountTerminalLimit = null;
  }

  var zreportEnabledAll = false;
  if (src.zreportFridayEnabled==='N'
      && src.zreportMondayEnabled==='N'
      && src.zreportSaturdayEnabled==='N'
      && src.zreportSundayEnabled==='N'
      && src.zreportThursdayEnabled==='N'
      && src.zreportTuesdayEnabled==='N'
      && src.zreportWednesdayEnabled==='N') {
  } else {
    zreportEnabledAll = true;
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
    'bankName': src.merchant.bank.name,
    'allowedLanguages': allowedLanguages,
    'receiptTemplateId': src.receiptTemplateId,
    'productNames': productNames,
    'ipsNames': src.ipsNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'totalAmountTerminalLimit': src.totalAmountTerminalLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': receiptSendChannels,
    'deviceName': src.deviceName,
    'zreportTime': {
      'friday': src.zreportFriday.substring(0, 5),
      'monday': src.zreportMonday.substring(0, 5),
      'saturday': src.zreportSaturday.substring(0, 5),
      'sunday': src.zreportSunday.substring(0, 5),
      'thursday': src.zreportThursday.substring(0, 5),
      'tuesday': src.zreportTuesday.substring(0, 5),
      'wednesday': src.zreportWednesday.substring(0, 5),
    },
    'zreportEnabled': {
      'friday': src.zreportFridayEnabled,
      'monday': src.zreportMondayEnabled,
      'saturday': src.zreportSaturdayEnabled,
      'sunday': src.zreportSundayEnabled,
      'thursday': src.zreportThursdayEnabled,
      'tuesday': src.zreportTuesdayEnabled,
      'wednesday': src.zreportWednesdayEnabled,
    },
    'zreportEnabledAll': zreportEnabledAll,
    'nfc': src.nfc,
    'block': src.block
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
      'bank': {
        'name': src.bankName
      }
    },
    'allowedLanguages': allowedLanguages,
    // 'allowedIpsCardGroups': src.allowedIpsCardGroups,
    'ipsCardGroupIdList': ipsCardGroupIdList,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': src.receiptSendChannels,
    'zreportFriday': src.zreportTime.friday + ':00',
    'zreportMonday': src.zreportTime.monday + ':00',
    'zreportSaturday': src.zreportTime.saturday + ':00',
    'zreportSunday': src.zreportTime.sunday + ':00',
    'zreportThursday': src.zreportTime.thursday + ':00',
    'zreportTuesday': src.zreportTime.tuesday + ':00',
    'zreportWednesday': src.zreportTime.wednesday + ':00',
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
    'receiptSendChannelIdList': src.receiptSendChannels,
    'nfc': src.nfc,
    'block': src.block
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
