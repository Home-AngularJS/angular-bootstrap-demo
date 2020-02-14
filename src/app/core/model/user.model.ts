import {dtoToUserRole} from './user-role.model';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface UserRoleModel {
  roleCode: string;
  description: string;
  roleAuthorities: any;
}

export interface UserModel {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  userRoles: any;
}

export interface ResultUserModel {
  content: UserModel[];
  totalElements: string;
}

export interface FilterUserModel {
  username: string;
  email: string;
}

export function filterUserToUrl(src: any) {
  let dest: string = '';

  if (src.username !== '' && src.username !== null && src.username !== undefined) {
    dest += 'username=' + src.username;
  }
  if (src.email !== '' && src.email !== null && src.email !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'v=' + src.email;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterUserEmpty() {
  const dest = {
    'username': null,
    'email': null
  };
  return dest;
}

export function dtoToUser(src: any) {
  let roleCode = '';
  if (Array.isArray(src.userRoles) && src.userRoles.length) {
    for (let i = 0; i < src.userRoles.length; i++) {
      const userRole: UserRoleModel = src.userRoles[i]
      roleCode = userRole.roleCode;
    }
  }

  const dest: any = {
    'username': src.username,
    'email': src.email,
    'firstName': src.firstName,
    'lastName': src.lastName,
    'roleCode': roleCode,
    'password': '',
    'confirmPassword': ''
  };
  return dest;
}

export function registerNewUser(src: any) {
  const dest = {
    'username': src.username,
    'email': src.email,
    'firstName': src.firstName,
    'lastName': src.lastName,
    'password': src.password
  };
  return dest;
}

export function newUser() {
  const dest = {
    'username': null,
    'email': null,
    'firstName': null,
    'lastName': null,
    'password': null,
    'confirmPassword': null,
    'roleCode': null
  };
  return dest;
}

export function assignRolesToUser(src: any) {
  const userRoleCodeList = []
  userRoleCodeList.push(src.roleCode);

  const dest = {
    'userRoleCodeList': userRoleCodeList
  };
  return dest;
}

export interface FilterUser {
  username: string;
  email: string;
}


export function filterUserFormEmpty() {
  const dest = {
    'username': '',
    'email': '',
  };
  return dest;
}

export function dtoToFilterUser(src: any) {
  let _username = src.username===undefined ? [] : src.username;
  let _email = src.email===undefined ? [] : src.email;

  let username: string = (Array.isArray(_username) && _username.length) ? _username[0].value : '';
  let email: string = (Array.isArray(_email) && _email.length) ? _email[0].value : '';

  const dest = {
    'username': username,
    'email': email,
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
