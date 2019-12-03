/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

export interface ReceiptSendAuditModel {
  id: any;
  receiptSendChannel: any;
  recipient: any;
  sendDate: any;
  successful: any;
  transaction: any;
}

export interface ResultReceiptSendAuditModel {
  content: ReceiptSendAuditModel[];
  totalElements: string;
}


interface FilterReceiptSendAuditModel {
  receiptNumber: any;
  transactionId: any;
}

export function filterReceiptSendAuditEmpty() {
  const dest = {
    'receiptNumber': null,
    'transactionId': null
  };
  return dest;
}

export function dtoToReceiptSendAudit(src: any) {
  const transactionId = src.transaction.transactionId.replace( '-', '').substring(0, 10);
  const receiptSendChannel = src.receiptSendChannel.enabled ? src.receiptSendChannel.name : '';

  const dest: any = {
    'id': src.id,
    'receiptSendChannel': receiptSendChannel,
    'recipient': src.recipient,
    'sendDate': src.sendDate,
    'successful': src.successful,
    'transactionId': transactionId,
    'transactionIdReal': src.transactionId,
    'transaction': src.transaction,
    'receiptNumber': src.receiptNumber
  };
  return dest;
}

export function receiptSendAuditToDto(src: any) {
  const dest = {
    'id': src.id,
    'receiptSendChannel': src.receiptSendChannel,
    'recipient': src.recipient,
    'sendDate': src.sendDate,
    'successful': src.successful,
    'transaction': src.transaction,
    'receiptNumber': src.receiptNumber
  };
  return dest;
}

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 */
function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}


export interface FilterReceiptSendAudit {
  receiptNumber: string;
  transactionId: string;
}

export function filterReceiptSendAuditFormEmpty() {
  const dest = {
    'receiptNumber': '',
    'transactionId': '',
  };
  return dest;
}

export function dtoToFilterReceiptSendAudit(src: any) {
  let _receiptNumber = src.receiptNumber===undefined ? [] : src.receiptNumber;
  let _transactionId = src.transactionId===undefined ? [] : src.transactionId;

  let receiptNumber: string = (Array.isArray(_receiptNumber) && _receiptNumber.length) ? _receiptNumber[0].value : '';
  let transactionId: string = (Array.isArray(_transactionId) && _transactionId.length) ? _transactionId[0].value : '';

  const dest = {
    'receiptNumber': receiptNumber,
    'transactionId': transactionId,
  };
  return dest;
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
