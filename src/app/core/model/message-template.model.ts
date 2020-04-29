/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface MessageTemplateModel {
  id: string;
  text: string;
  shortText: string;
  isShortText: boolean;
}

export interface ResultMessageTemplateModel {
  content: MessageTemplateModel[];
  totalElements: string;
}

export interface FilterMessageTemplateModel {
  id: string;
  text: string;
}

export function filterMessageTemplateToUrl(src: any) {
  let dest: string = '';

  if (src.id !== '' && src.id !== null && src.id !== undefined) {
    dest += 'id=' + src.id;
  }
  if (src.text !== '' && src.text !== null && src.text !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'text=' + src.text;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterMessageTemplateEmpty() {
  const dest = {
    'id': null,
    'text': null
  };
  return dest;
}

export function dtoToMessageTemplate(src: any) {
  const SHORT_LENGTH = 37;
  const SHORT_SUBSTRING_LENGTH = SHORT_LENGTH - 2;

  const text: string = src.text;
  const isShortText: boolean = src.text.length < SHORT_LENGTH ? false : true;
  const shortText: string = isShortText ? src.text.substring(0, SHORT_SUBSTRING_LENGTH) + SHORT_SUBSTRING_TEXT : src.text;

  const dest: any = {
    'id': src.id,
    'text': text,
    'shortText': shortText,
    'isShortText': isShortText
  };
  return dest;
}

export function createNewMessageTemplate(src: any) {
  const dest = {
    'text': src.text
  };
  return dest;
}

export function newMessageTemplate() {
  const dest = {
    'text': null
  };
  return dest;
}

export interface FilterMessageTemplate {
  id: string;
  text: string;
}


export function filterMessageTemplateFormEmpty() {
  const dest = {
    'id': '',
    'text': '',
  };
  return dest;
}

export function dtoToFilterMessageTemplate(src: any) {
  let _id = src.id===undefined ? [] : src.id;
  let _text = src.text===undefined ? [] : src.text;

  let id: string = (Array.isArray(_id) && _id.length) ? _id[0].value : '';
  let text: string = (Array.isArray(_text) && _text.length) ? _text[0].value : '';

  const dest = {
    'id': id,
    'text': text,
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
