import * as moment from 'moment';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface Terminal {
  terminalId: string;
  shortTerminalId: string;
  isShortTerminalId: boolean;
  groupNumber: any;
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
  merchantName: string;
  shortMerchantName: string;
  isShortMerchantName: boolean;
  merchantLocation: any;
  taxId: any;
  mcc: any;
  bankName: string;
  shortBankName: string;
  isShortBankName: boolean;
  allowedIpsCardGroups: any;
  oneTransactionLimit: any;
  noPinLimit: any;
  totalAmountTerminalLimit: any;
  opQr: any;
  addData: any;
  receiptSendChannels: any;
  zreportTime: any;
  zreportEnabledAll: any;
  opNfc: any;
  totalAmountLimit: any;
  totalCountLimit: any;
  totalLimitPeriod: any;
  status: string;
  shortStatus: string;
  isShortStatus: boolean;
  lastTransactionDate: any;
  lastUpdateDate: any;
  currencyCode: any;
  velocityCount: any;
  velocityPeriod: any;
  velocityTimeUnit: any;
  latitude: any;
  longitude: any;
  radius: any;
  opTips: any;
  checked: boolean;
}

export interface TerminalModel {
  terminalId: string;
  shortTerminalId: string;
  isShortTerminalId: boolean;
  groupNumber: any;
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
  merchantName: string;
  shortMerchantName: string;
  isShortMerchantName: boolean;
  merchantLocation: any;
  taxId: any;
  mcc: any;
  bankName: string;
  shortBankName: string;
  isShortBankName: boolean;
  allowedIpsCardGroups: any;
  oneTransactionLimit: any;
  noPinLimit: any;
  totalAmountTerminalLimit: any;
  opQr: any;
  addData: any;
  receiptSendChannels: any;
  productNames: any;
  productIds: any;
  zreportTime: any;
  zreportEnabledAll: any;
  opNfc: any;
  totalAmountLimit: any;
  totalCountLimit: any;
  totalLimitPeriod: any;
  status: string;
  shortStatus: string;
  isShortStatus: boolean;
  lastTransactionDate: any;
  lastUpdateDate: any;
  currencyCode: any;
  velocityCount: any;
  velocityPeriod: any;
  velocityTimeUnit: any;
  repeatRegistration: any;
  latitude: any;
  longitude: any;
  radius: any;
  opTips: any;
  checked: boolean;
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
  bankName: any;
  status: any;
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
  if (src.bankName !== '' && src.bankName !== null && src.bankName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'bankName=' + src.bankName;
  }
  if (src.status !== '' && src.status !== null && src.status !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'status=' + src.status;
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
    'legalName': null,
    'bankName': null,
    'status': null
  };
  return dest;
}

export function dtoToTerminal(src: any) {
  const receiptSendChannels: any = [];
  for (let r = 0; r < src.receiptSendChannels.length; r++) {
    if (src.receiptSendChannels[r].enabled) {
      receiptSendChannels.push(src.receiptSendChannels[r].name);
    }
  }

  const productNames: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productNames.push(src.products[i].productName);
  }
  const productIds: any = [];
  for (let i = 0; i < src.products.length; i++) {
    productIds.push(src.products[i].productId);
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

  let color = src.status==='ACTIVE' ? '#006600' : '#AAAAAA';

  const TERMINAL_ID_SHORT_LENGTH = 11;
  const TERMINAL_ID_SHORT_SUBSTRING_LENGTH = TERMINAL_ID_SHORT_LENGTH - 2;
  const terminalId: string = src.terminalId;
  const isShortTerminalId: boolean = src.terminalId.length < TERMINAL_ID_SHORT_LENGTH ? false : true;
  const shortTerminalId: string = isShortTerminalId ? src.terminalId.substring(0, TERMINAL_ID_SHORT_SUBSTRING_LENGTH) + SHORT_SUBSTRING_TEXT : src.terminalId;

  const MERCHANT_NAME_SHORT_LENGTH = 20;
  const MERCHANT_NAME_SHORT_SUBSTRING_LENGTH = MERCHANT_NAME_SHORT_LENGTH - 2;
  const merchantName: string = src.merchant.merchantName;
  const isShortMerchantName: boolean = src.merchant.merchantName.length < MERCHANT_NAME_SHORT_LENGTH ? false : true;
  const shortMerchantName: string = isShortMerchantName ? src.merchant.merchantName.substring(0, MERCHANT_NAME_SHORT_SUBSTRING_LENGTH) + SHORT_SUBSTRING_TEXT : src.merchant.merchantName;

  const BANK_NAME_SHORT_LENGTH = 11;
  const BANK_NAME_SHORT_SUBSTRING_LENGTH = BANK_NAME_SHORT_LENGTH - 2;
  const bankName: string = src.merchant.bank.name;
  const isShortBankName: boolean = src.merchant.bank.name.length < BANK_NAME_SHORT_LENGTH ? false : true;
  const shortBankName: string = isShortBankName ? src.merchant.bank.name.substring(0, BANK_NAME_SHORT_SUBSTRING_LENGTH) + SHORT_SUBSTRING_TEXT : src.merchant.bank.name;

  const STATUS_SHORT_LENGTH = 11;
  const STATUS_SHORT_SUBSTRING_LENGTH = STATUS_SHORT_LENGTH - 2;
  const status: string = src.status;
  const isShortStatus: boolean = src.status.length < STATUS_SHORT_SUBSTRING_LENGTH ? false : true;
  const shortStatus: string = isShortStatus ? src.status.substring(0, STATUS_SHORT_SUBSTRING_LENGTH) + '...' : src.status;

  const dest: any = {
    'terminalId': terminalId,
    'shortTerminalId': shortTerminalId,
    'isShortTerminalId': isShortTerminalId,
    'groupNumber': src.groupNumber,
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
    'merchantName': merchantName,
    'shortMerchantName': shortMerchantName,
    'isShortMerchantName': isShortMerchantName,
    'merchantLocation': src.merchant.merchantLocation,
    'taxId': src.merchant.taxId,
    'mcc': src.merchant.mcc,
    'bankName': bankName,
    'shortBankName': shortBankName,
    'isShortBankName': isShortBankName,
    'receiptTemplateId': src.receiptTemplate.id,
    'productNames': productNames,
    'productIds': productIds,
    'ipsNames': ipsNames,
    'oneTransactionLimit': src.oneTransactionLimit,
    'noPinLimit': src.noPinLimit,
    'totalAmountTerminalLimit': src.totalAmountTerminalLimit,
    'opQr': src.opQr,
    'addData': src.addData,
    'receiptSendChannels': receiptSendChannels,
    'zreportEnabledAll': zreportEnabledAll,
    'opNfc': src.opNfc,
    'totalAmountLimit': src.totalAmountLimit,
    'totalCountLimit': src.totalCountLimit,
    'totalLimitPeriod': src.totalLimitPeriod,
    'status': status,
    'shortStatus': shortStatus,
    'isShortStatus': isShortStatus,
    'color': color,
    'lastTransactionDate': src.lastTransactionDate,
    'lastUpdateDate': src.lastUpdateDate,
    'currencyCode': src.currency.code,
    'velocityCount': src.velocityCount,
    'velocityPeriod': src.velocityPeriod,
    'velocityTimeUnit': src.velocityTimeUnit,
    'repeatRegistration': src.repeatRegistration,
    'latitude': src.latitude ? src.latitude : '0',
    'longitude': src.longitude ? src.longitude : '0',
    'radius': src.radius,
    'opTips': src.opTips,
    'checked': src.checked,
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

/**
 * @see https://www.tutorialspoint.com/typescript/typescript_string_split.htm
 */
function dateToDateTime(oldDateTime: any, newDateTime: any) {
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
  bankName: any;
  status: any;
}


export function filterTerminalFormEmpty() {
  const dest = {
    'terminalId': '',
    'groupNumber': '',
    'dateTimeInit': '',
    'merchantName': '',
    'legalName': '',
    'bankName': '',
    'status': ''
  };
  return dest;
}

export function dtoToFilterTerminal(src: any) {
  let _terminalId = src.terminalId===undefined ? [] : src.terminalId;
  let _groupNumber = src.groupNumber===undefined ? [] : src.groupNumber;
  let _dateTimeInit = src.dateTimeInit===undefined ? [] : src.dateTimeInit;
  let _merchantName = src.merchantName===undefined ? [] : src.merchantName;
  let _legalName = src.legalName===undefined ? [] : src.legalName;
  let _bankName = src.bankName===undefined ? [] : src.bankName;
  let _status = src.status===undefined ? [] : src.status;

  let terminalId: string = (Array.isArray(_terminalId) && _terminalId.length) ? _terminalId[0].value : '';
  let groupNumber: string = (Array.isArray(_groupNumber) && _groupNumber.length) ? _groupNumber[0].value : '';
  let dateTimeInit: string = (Array.isArray(_dateTimeInit) && _dateTimeInit.length) ? _dateTimeInit[0].value : '';
  let merchantName: string = (Array.isArray(_merchantName) && _merchantName.length) ? _merchantName[0].value : '';
  let legalName: string = (Array.isArray(_legalName) && _legalName.length) ? _legalName[0].value : '';
  let bankName: string = (Array.isArray(_bankName) && _bankName.length) ? _bankName[0].value : '';
  let status: string = (Array.isArray(_status) && _status.length) ? _status[0].value : '';

  const dest = {
    'terminalId': terminalId,
    'groupNumber': groupNumber.replace('1: ', '').replace('2: ', '').replace('3: ', '').replace('4: ', '').replace('5: ', '').replace('6: ', '').replace('7: ', '').replace('8: ', '').replace('9: ', '').replace('10: ', ''),
    'dateTimeInit': dateTimeInit,
    'merchantName': merchantName,
    'legalName': legalName,
    'bankName': bankName,
    'status': status.replace('1: ', '').replace('2: ', '').replace('3: ', '').replace('4: ', '').replace('5: ', '').replace('6: ', '').replace('7: ', '').replace('8: ', '').replace('9: ', '').replace('10: ', '')
  };
  return dest;
}

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 * https://stackoverflow.com/questions/28435540/array-to-string-angular
 */
const SHORT_SUBSTRING_TEXT = '•••';
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
