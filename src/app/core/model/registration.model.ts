/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface RegistrationModel {
  merchantId: any;
  mcc: any;
  merchantLegalName: any;
  merchantLocation: any;
  merchantName: any;
  taxId: any;
  bankName: any;
}

export interface ResultRegistrationModel {
  content: RegistrationModel[];
  totalElements: string;
}

export interface FilterRegistrationModel {
  merchantId: any;
  mcc: any;
  merchantLegalName: any;
  merchantLocation: any;
  merchantName: any;
  bankName: any;
}

export function filterRegistrationToUrl(src: any) {
  let dest: string = '';

  if (src.merchantId !== '' && src.merchantId !== null && src.merchantId !== undefined) {
    dest += 'merchantId=' + src.merchantId;
  }
  if (src.mcc !== '' && src.mcc !== null && src.mcc !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'mcc=' + src.mcc;
  }
  if (src.merchantLegalName !== '' && src.merchantLegalName !== null && src.merchantLegalName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantLegalName=' + src.merchantLegalName;
  }
  if (src.merchantLocation !== '' && src.merchantLocation !== null && src.merchantLocation !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantLocation=' + src.merchantLocation;
  }
  if (src.merchantName !== '' && src.merchantName !== null && src.merchantName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantName=' + src.merchantName;
  }
  if (src.taxId !== '' && src.taxId !== null && src.taxId !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'taxId=' + src.taxId;
  }
  if (src.bankName !== '' && src.bankName !== null && src.bankName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'bankName=' + src.bankName;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterRegistrationEmpty() {
  const dest = {
    'merchantId': null,
    'mcc': null,
    'merchantLegalName': null,
    'merchantLocation': null,
    'merchantName': null,
    'taxId': null,
    'bankName': null
  };
  return dest;
}

export function dtoToRegistration(src: any) {
  const dest: any = {
    'merchantId': src.merchantId,
    'mcc': src.mcc,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'merchantName': src.merchantName,
    'taxId': src.taxId,
    'bankName': src.bank.name
  };
  return dest;
}

export function registrationToDto(src: any) {
  const dest = {
    'merchantId': src.merchantId,
    'mcc': src.mcc,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'merchantName': src.merchantName,
    'taxId': src.taxId
  };
  return dest;
}

export interface FilterRegistration {
  merchantId: any;
  mcc: any;
  merchantLegalName: any;
  merchantLocation: any;
  merchantName: any;
  bankName: any;
}


export function filterRegistrationFormEmpty() {
  const dest = {
    'merchantId': '',
    'mcc': '',
    'merchantLegalName': '',
    'merchantLocation': '',
    'merchantName': '',
    'bankName': '',
  };
  return dest;
}

export function dtoToFilterRegistration(src: any) {
  let _merchantId = src.merchantId===undefined ? [] : src.merchantId;
  let _mcc = src.mcc===undefined ? [] : src.mcc;
  let _merchantLegalName = src.merchantLegalName===undefined ? [] : src.merchantLegalName;
  let _merchantLocation = src.merchantLocation===undefined ? [] : src.merchantLocation;
  let _merchantName = src.merchantName===undefined ? [] : src.merchantName;
  let _bankName = src.bankName===undefined ? [] : src.bankName;

  let merchantId: string = (Array.isArray(_merchantId) && _merchantId.length) ? _merchantId[0].value : '';
  let mcc: string = (Array.isArray(_mcc) && _mcc.length) ? _mcc[0].value : '';
  let merchantLegalName: string = (Array.isArray(_merchantLegalName) && _merchantLegalName.length) ? _merchantLegalName[0].value : '';
  let merchantLocation: string = (Array.isArray(_merchantLocation) && _merchantLocation.length) ? _merchantLocation[0].value : '';
  let merchantName: string = (Array.isArray(_merchantName) && _merchantName.length) ? _merchantName[0].value : '';
  let bankName: string = (Array.isArray(_bankName) && _bankName.length) ? _bankName[0].value : '';

  const dest = {
    'merchantId': merchantId,
    'mcc': mcc,
    'merchantLegalName': merchantLegalName,
    'merchantLocation': merchantLocation,
    'merchantName': merchantName,
    'bankName': bankName
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
