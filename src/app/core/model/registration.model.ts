/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface RegistrationModel {
  id: any;
  merchantId: any;
  merchantName: any;
  taxId: any;
  terminalId: any;
  groupNumber: any;
  bankId: any;
  mcc: any;
  merchantLegalName: any;
  merchantLocation: any;
  phoneNumber: any;
  registrationDate: any;
  createdDate: any;
  userLogin: any;
  latitude: any;
  longitude: any;
  radius: any;
  status: any;
  tmkUnderZmk: any;
}

export interface ResultRegistrationModel {
  content: RegistrationModel[];
  totalElements: string;
}

export interface FilterRegistrationModel {
  id: any;
  userLogin: any;
  merchantId: any;
  phoneNumber: any;
  mcc: any;
  merchantLocation: any;
  merchantName: any;
  startRegistrationDate: any;
  endRegistrationDate: any;
}

export function filterRegistrationToUrl(src: any) {
  let dest: string = '';

  if (src.id !== '' && src.id !== null && src.id !== undefined) {
    dest += 'id=' + src.id;
  }
  if (src.userLogin !== '' && src.userLogin !== null && src.userLogin !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'v=' + src.userLogin;
  }
  if (src.merchantId !== '' && src.merchantId !== null && src.merchantId !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantId=' + src.merchantId;
  }
  if (src.phoneNumber !== '' && src.phoneNumber !== null && src.phoneNumber !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'phoneNumber=' + src.phoneNumber;
  }
  if (src.mcc !== '' && src.mcc !== null && src.mcc !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'mcc=' + src.mcc;
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
  if (src.startRegistrationDate !== '' && src.startRegistrationDate !== null && src.startRegistrationDate !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'startRegistrationDate=' + src.startRegistrationDate;
  }
  if (src.endRegistrationDate !== '' && src.endRegistrationDate !== null && src.endRegistrationDate !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'endRegistrationDate=' + src.endRegistrationDate;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterRegistrationEmpty() {
  const dest = {
    'id': null,
    'userLogin': null,
    'merchantId': null,
    'phoneNumber': null,
    'mcc': null,
    'merchantLocation': null,
    'merchantName': null,
    'startRegistrationDate': null,
    'endRegistrationDate': null
  };
  return dest;
}

export function dtoToRegistration(src: any) {
  const dest: any = {
    'id': src.id,
    'merchantId': src.merchantId,
    'merchantName': src.merchantName,
    'taxId': src.taxId,
    'terminalId': src.terminalId,
    'groupNumber': src.serviceGroup.groupNumber,
    'bankId': src.bank.id,
    'mcc': src.mcc,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'phoneNumber': src.phoneNumber,
    'registrationDate': src.registrationDate,
    'createdDate': src.createdDate,
    'userLogin': src.userLogin,
    'latitude': src.latitude,
    'longitude': src.longitude,
    'radius': 0 < src.radius ? src.radius + '000' : '0',
    'status': src.status
  };
  return dest;
}

export function registrationToDto(src: any) {
  const dest = {
    'bankId': src.bankId,
    'groupNumber': src.groupNumber,
    'latitude': src.latitude,
    'longitude': src.longitude,
    'mcc': src.mcc,
    'merchantId': src.merchantId,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'merchantName': src.merchantName,
    'radius': src.radius,
    'taxId': src.taxId,
    'terminalId': src.terminalId,
    'userLogin': src.userLogin,
    'userPassword': src.userPassword,
    'phoneNumber': src.phoneNumber,
    'tmkUnderZmk': src.tmkUnderZmk
  };
  return dest;
}

export function registrationNew() {
  const dest = {
    'bankId': null,
    'groupNumber': null,
    'latitude': null,
    'longitude': null,
    'mcc': null,
    'merchantId': null,
    'merchantLegalName': null,
    'merchantLocation': null,
    'merchantName': null,
    'radius': null,
    'taxId': null,
    'terminalId': null,
    'userLogin': null,
    'userPassword': null,
    'confirmUserPassword': null,
    'phoneNumber': null,
    'tmkUnderZmk': null
  };
  return dest;
}

export interface FilterRegistration {
  id: any;
  userLogin: any;
  merchantId: any;
  phoneNumber: any;
  mcc: any;
  merchantLocation: any;
  merchantName: any;
  startRegistrationDate: any;
  endRegistrationDate: any;
}


export function filterRegistrationFormEmpty() {
  const dest = {
    'id': '',
    'userLogin': '',
    'merchantId': '',
    'phoneNumber': '',
    'mcc': '',
    'merchantLocation': '',
    'merchantName': '',
    'startRegistrationDate': '',
    'endRegistrationDate': '',
  };
  return dest;
}

export function dtoToFilterRegistration(src: any) {
  let _id = src.id===undefined ? [] : src.id;
  let _userLogin = src.userLogin===undefined ? [] : src.userLogin;
  let _merchantId = src.merchantId===undefined ? [] : src.merchantId;
  let _mcc = src.mcc===undefined ? [] : src.mcc;
  let _phoneNumber = src.phoneNumber===undefined ? [] : src.phoneNumber;
  let _merchantLocation = src.merchantLocation===undefined ? [] : src.merchantLocation;
  let _merchantName = src.merchantName===undefined ? [] : src.merchantName;
  let _startRegistrationDate = src.startRegistrationDate===undefined ? [] : src.startRegistrationDate;
  let _endRegistrationDate = src.endRegistrationDate===undefined ? [] : src.endRegistrationDate;

  let id: string = (Array.isArray(_id) && _id.length) ? _id[0].value : '';
  let userLogin: string = (Array.isArray(_userLogin) && _userLogin.length) ? _userLogin[0].value : '';
  let merchantId: string = (Array.isArray(_merchantId) && _merchantId.length) ? _merchantId[0].value : '';
  let phoneNumber: string = (Array.isArray(_phoneNumber) && _phoneNumber.length) ? _phoneNumber[0].value : '';
  let mcc: string = (Array.isArray(_mcc) && _mcc.length) ? _mcc[0].value : '';
  let merchantLocation: string = (Array.isArray(_merchantLocation) && _merchantLocation.length) ? _merchantLocation[0].value : '';
  let merchantName: string = (Array.isArray(_merchantName) && _merchantName.length) ? _merchantName[0].value : '';
  let startRegistrationDate: string = (Array.isArray(_startRegistrationDate) && _startRegistrationDate.length) ? _startRegistrationDate[0].value : '';
  let endRegistrationDate: string = (Array.isArray(_endRegistrationDate) && _endRegistrationDate.length) ? _endRegistrationDate[0].value : '';

  const dest = {
    'id': id,
    'userLogin': userLogin,
    'merchantId': merchantId,
    'phoneNumber': phoneNumber,
    'mcc': mcc,
    'merchantLocation': merchantLocation,
    'merchantName': merchantName,
    'startRegistrationDate': startRegistrationDate,
    'endRegistrationDate': endRegistrationDate
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
