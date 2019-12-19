import * as moment from 'moment';
import { DataService } from '../../core/service/data.service';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface Terminal {
  terminalId: any;
  groupNumber: any;
  // configChanged: any;
  dateTimeInit: any;
  legalName: any;
  geoPosition: any;
  opManual: any;
  opPurchase: any;
  opRefund: any;
  opReversal: any;
  opPin: any;
  receiptTemplate: any;
  receiptTemplateId: any;
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
  opNfc: any;
  totalAmountLimit: any;
  totalCountLimit: any;
  totalLimitPeriod: any;
  block: any;
  lastTransactionDate: any;
  lastUpdateDate: any;
}

export interface TerminalModel {
  terminalId: any;
  groupNumber: any;
  // configChanged: any;
  dateTimeInit: any;
  legalName: any;
  geoPosition: any;
  opManual: any;
  opPurchase: any;
  opRefund: any;
  opReversal: any;
  opPin: any;
  receiptTemplate: any;
  receiptTemplateId: any;
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
  opNfc: any;
  totalAmountLimit: any;
  totalCountLimit: any;
  totalLimitPeriod: any;
  block: any;
  lastTransactionDate: any;
  lastUpdateDate: any;
}

export interface ResultTerminalModel {
  content: TerminalModel[];
  totalElements: string;
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

  const ipsNames: any = [];
  for (let i = 0; i < src.allowedIpsCardGroups.length; i++) {
    ipsNames.push(src.allowedIpsCardGroups[i].ipsName);
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
    // 'configChanged': isNotEmpty(src.configChanged) ? src.configChanged : '',
    'dateTimeInit': src.dateTimeInit,
    'legalName': src.merchant.merchantLegalName,
    'geoPosition': src.geoPosition,
    'opManual': src.opManual,
    'opPurchase': src.opPurchase,
    'opRefund': src.opRefund,
    'opReversal': src.opRefund,
    'opPin': src.opPin,
    'receiptTemplate': src.receiptTemplate,
    'merchantId': src.merchant.merchantId,
    'merchantName': src.merchant.merchantName,
    'merchantLocation': src.merchant.merchantLocation,
    'taxId': src.merchant.taxId,
    'mcc': src.merchant.mcc,
    'bankName': src.merchant.bank.name,
    'allowedLanguages': allowedLanguages,
    'receiptTemplateId': src.receiptTemplate.id,
    'productNames': productNames,
    'ipsNames': ipsNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'totalAmountTerminalLimit': src.totalAmountTerminalLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': receiptSendChannels,
    'deviceName': src.deviceName,
    'zreportEnabledAll': zreportEnabledAll,
    'opNfc': src.opNfc,
    'totalAmountLimit': src.totalAmountLimit,
    'totalCountLimit': src.totalCountLimit,
    'totalLimitPeriod': src.totalLimitPeriod,
    'block': src.block,
    'lastTransactionDate': src.lastTransactionDate,
    'lastUpdateDate': src.lastUpdateDate,
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
    }
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
    'opManual': src.opManual,
    'opPin': src.opPin,
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
    'opManual': src.opManual,
    'maskSymbol': src.maskSymbol,
    'noPinLimit': src.noPinLimit,
    'oneTransactionLimit': src.oneTransactionLimit,
    'opPurchase': src.opPurchase,
    'opQr': src.opQr,
    'opRefund': src.opRefund,
    'opReversal': src.opReversal,
    'opPin': src.opPin,
    'productIdList': src.productIdList,
    'receiptTemplateId': src.receiptTemplateId,
    'addData': src.addData,
    'receiptSendChannelIdList': src.receiptSendChannels,
    'opNfc': src.opNfc,
    'totalAmountLimit': src.totalAmountLimit,
    'totalCountLimit': src.totalCountLimit,
    'totalLimitPeriod': src.totalLimitPeriod,
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

export interface FilterTerminal {
  terminalId: any;
  groupNumber: any;
  dateTimeInit: any;
  merchantName: any;
  legalName: any;
}


export function filterTerminalFormEmpty() {
  const dest = {
    'terminalId': '',
    'groupNumber': '',
    'dateTimeInit': '',
    'merchantName': '',
    'legalName': ''
  };
  return dest;
}

export function dtoToFilterTerminal(src: any) {
  let _terminalId = src.terminalId===undefined ? [] : src.terminalId;
  let _groupNumber = src.groupNumber===undefined ? [] : src.groupNumber;
  let _dateTimeInit = src.dateTimeInit===undefined ? [] : src.dateTimeInit;
  let _merchantName = src.merchantName===undefined ? [] : src.merchantName;
  let _legalName = src.legalName===undefined ? [] : src.legalName;

  let terminalId: string = (Array.isArray(_terminalId) && _terminalId.length) ? _terminalId[0].value : '';
  let groupNumber: string = (Array.isArray(_groupNumber) && _groupNumber.length) ? _groupNumber[0].value : '';
  let dateTimeInit: string = (Array.isArray(_dateTimeInit) && _dateTimeInit.length) ? _dateTimeInit[0].value : '';
  let merchantName: string = (Array.isArray(_merchantName) && _merchantName.length) ? _merchantName[0].value : '';
  let legalName: string = (Array.isArray(_legalName) && _legalName.length) ? _legalName[0].value : '';

  const dest = {
    'terminalId': terminalId,
    'groupNumber': groupNumber,
    'dateTimeInit': dateTimeInit,
    'merchantName': merchantName,
    'legalName': legalName
  };
  return dest;
}

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 * https://stackoverflow.com/questions/28435540/array-to-string-angular
 */
const titleFilterSeparator = ' ➠ ';
const     filtersSeparator = ' ■ ';
const titleFilter: any = {};

export function getTitleFilter() {
  return isNotEmpty(titleFilter.val) ? titleFilterSeparator + titleFilter.val : '';
}

export function appendTitleFilter(val) {
  if (isNotEmpty(val)) {
    if (!Array.isArray(val)) appendTitle(val);
    if (Array.isArray(val) && val.length) {
      val = val.join(filtersSeparator);
      appendTitle(val);
    }
  }
}

function appendTitle(val) {
  if (isEmpty(titleFilter.val)) titleFilter.val = val;
  else titleFilter.val += filtersSeparator + val;
}

export function clearTitleFilter() {
  titleFilter.val = '';
}

export function isNotEmpty(val) {
  return !isEmpty(val);
}

export function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}

export function getBtnFilters(filter: any): any[] {
  const btnFilters: any = [];
  const filters = btnFilter(filter).split('&');
  if (Array.isArray(filters) && filters.length && 1<filters.length) {
    for (let f = 0; f < filters.length; f++) btnFilters.push(getBtnFilter(filters[f]));
  } else {
    const _filter = btnFilter(filter);
    btnFilters.push(getBtnFilter(_filter));
  }
  return btnFilters;
}

function btnFilter(filter: any) {
  let strFilter: string = JSON.stringify(filter).toString();
  strFilter = strFilter.replace('"}],"":', '"}],"btnFilter":');
  strFilter = strFilter.replace('{"":', '{"btnFilter":');
  let _filter = JSON.parse(strFilter);
  let _btnFilter = _filter.btnFilter===undefined ? [] : _filter.btnFilter;
  return (Array.isArray(_btnFilter) && _btnFilter.length) ? _btnFilter[0].value : '';
}

export function getBtnFilter(filter: any): FilterFieldValue {
  const _filter = filter.split('=');
  const field = (Array.isArray(_filter) && _filter.length) ? _filter[0] : '';
  const value = (Array.isArray(_filter) && _filter.length && _filter.length==2) ? _filter[1] : '';
  const dest = {
    'field': field,
    'value': value
  };
  return dest;
}

export interface FilterFieldValue {
  field: string;
  value: string;
}
