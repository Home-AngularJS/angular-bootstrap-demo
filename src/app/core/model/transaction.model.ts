/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

export interface TransactionModel {
  amount: any;
  amountOther: any;
  approvalCode: any;
  currency: any;
  device: {
    appId: any;
    appStatus: any;
    appVersion: any;
    deviceFingerprint: any;
    deviceName: any;
    deviceSn: any;
    deviceStatus: any;
    imei: any;
    initDate: any;
    osVersion: any;
    serialNumber: any;
    terminal: {
      terminalId: any;
      groupNumber: any;
      opPurchase: any;
      opReversal: any;
      opRefund: any;
      opQr: any;
      manual: any;
      pin: any;
      geoPosition: any;
      oneTransactionLimit: any;
      noPinLimit: any;
      configChanged: any;
      dateTimeInit: any;
      beginMask: any;
      endMask: any;
      maskSymbol: any;
    }
  };
  formFactor: any;
  operation: any;
  panMasked: any;
  panSn: any;
  receiptNumber: any;
  responseCode: any;
  rrn: any;
  statusCode: any;
  transactionDate: any;
  transactionId: any;
  responseDate: any;
  addField: any;
  lastRefundDate: any;
}

export interface ResultTransactionModel {
  content: TransactionModel[];
  totalElements: string;
}


export interface FilterTransactionModel {
  transactionId: any;
  panMasked: any;
  approvalCode: any;
  rrn: any;
  terminalId: any;
}

export function filterTransactionToUrl(src: any) {
  let dest: string = '';

  if (src.transactionId !== undefined && src.transactionId !== null && src.transactionId !== '') {
    dest += 'transactionId=' + src.transactionId;
  }
  if (src.panMasked !== undefined && src.panMasked !== null && src.panMasked !== '') {
    if (dest !== '') dest += '&';
    dest += 'panMasked=' + src.panMasked;
  }
  if (src.approvalCode !== undefined && src.approvalCode !== null && src.approvalCode !== '') {
    if (dest !== '') dest += '&';
    dest += 'approvalCode=' + src.approvalCode;
  }
  if (src.rrn !== undefined && src.rrn !== null && src.rrn !== '') {
    if (dest !== '') dest += '&';
    dest += 'rrn=' + src.rrn;
  }
  if (src.terminalId !== undefined && src.terminalId !== null && src.terminalId !== '') {
    if (dest !== '') dest += '&';
    dest += 'terminalId=' + src.terminalId;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterTransactionEmpty() {
  const dest = {
    'transactionId': null,
    'panMasked': null,
    'approvalCode': null,
    'rrn': null,
    'terminalId': null
  };
  return dest;
}

export function dtoToTransaction(src: any) {
  const transactionId = src.transactionId.replace( '-', '').substring(0, 10)
  const currency = isNotEmpty(src.currency) ? src.currency.letterCode : ''

  const dest: any = {
    'amount': src.amount,
    'amountOther': src.amountOther,
    'approvalCode': src.approvalCode,
    'currency': currency,
    'formFactor': src.formFactor,
    'operation': src.operation,
    'panMasked': src.panMasked,
    'panSn': src.panSn,
    'receiptNumber': src.receiptNumber,
    'responseCode': src.responseCode,
    'rrn': src.rrn,
    'statusCode': src.statusCode,
    'transactionDate': src.transactionDate,
    'transactionId': transactionId,
    'transactionIdReal': src.transactionId,
    'responseDate': src.responseDate,
    'addField': src.addField,
    'lastRefundDate': src.lastRefundDate,
    'entryMode': src.entryMode
  };
  if (!isEmpty(src.terminal)) {
    dest.terminalId = src.terminal.terminalId;
    if (!isEmpty(src.terminal.device)) {
      dest.deviceSn = src.terminal.device.deviceSn;
      dest.appId = src.terminal.device.appId;
      dest.appStatus = src.terminal.device.appStatus;
      dest.deviceFingerprint = src.terminal.device.deviceFingerprint;
      dest.deviceName = src.terminal.device.deviceName;
      dest.deviceStatus = src.terminal.device.deviceStatus;
      dest.imei = src.terminal.device.imei;
      dest.initDate = src.terminal.device.initDate;
      dest.osVersion = src.terminal.device.osVersion;
      dest.serialNumber = src.terminal.device.serialNumber;
    }
  }
  return dest;
}

export function transactionToDto(src: any) {
  const dest = {
    'amount': src.amount,
    'amountOther': src.amountOther,
    'approvalCode': src.approvalCode,
    'currency': src.currency,
    'device': {
      'appId': src.appId,
      'appStatus': src.appStatus,
      'appVersion': src.appVersion,
      'deviceFingerprint': src.deviceFingerprint,
      'deviceName': src.deviceName,
      'deviceSn': src.deviceSn,
      'deviceStatus': src.deviceStatus,
      'imei': src.imei,
      'initDate': src.initDate,
      'osVersion': src.osVersion,
      'serialNumber': src.serialNumber,
      'terminal': {
        'terminalId': src.terminalId,
        'groupNumber': src.groupNumber,
        'opPurchase': src.opPurchase,
        'opReversal': src.opReversal,
        'opRefund': src.opRefund,
        'opQr': src.opQr,
        'manual': src.manual,
        'pin': src.pin,
        'geoPosition': src.geoPosition,
        'oneTransactionLimit': src.oneTransactionLimit,
        'noPinLimit': src.noPinLimit,
        'configChanged': src.configChanged,
        'dateTimeInit': src.dateTimeInit,
        'beginMask': src.beginMask,
        'endMask': src.endMask,
        'maskSymbol': src.maskSymbol,
      }
    },
    'formFactor': src.formFactor,
    'operation': src.operation,
    'panMasked': src.panMasked,
    'panSn': src.panSn,
    'receiptNumber': src.receiptNumber,
    'responseCode': src.responseCode,
    'rrn': src.rrn,
    'statusCode': src.statusCode,
    'transactionDate': src.transactionDate,
    'transactionId': src.transactionId,
    'responseDate': src.responseDate,
    'addField': src.addField,
    'lastRefundDate': src.lastRefundDate
  };
  return dest;
}

export interface FilterTransaction {
  transactionId: string;
  panMasked: string;
  approvalCode: string;
  rrn: string;
  terminalId: string;
}

export function filterTransactionFormEmpty() {
  const dest = {
    'transactionId': '',
    'panMasked': '',
    'approvalCode': '',
    'rrn': '',
    'terminalId': '',
  };
  return dest;
}

export function dtoToFilterTransaction(src: any) {
  let _transactionId = src.transactionId===undefined ? [] : src.transactionId;
  let _panMasked = src.panMasked===undefined ? [] : src.panMasked;
  let _approvalCode = src.approvalCode===undefined ? [] : src.approvalCode;
  let _rrn = src.rrn===undefined ? [] : src.rrn;
  let _terminalId = src.terminalId===undefined ? [] : src.terminalId;

  let transactionId: string = (Array.isArray(_transactionId) && _transactionId.length) ? _transactionId[0].value : '';
  let panMasked: string = (Array.isArray(_panMasked) && _panMasked.length) ? _panMasked[0].value : '';
  let approvalCode: string = (Array.isArray(_approvalCode) && _approvalCode.length) ? _approvalCode[0].value : '';
  let rrn: string = (Array.isArray(_rrn) && _rrn.length) ? _rrn[0].value : '';
  let terminalId: string = (Array.isArray(_terminalId) && _terminalId.length) ? _terminalId[0].value : '';

  const dest = {
    'transactionId': transactionId,
    'panMasked': panMasked,
    'approvalCode': approvalCode,
    'rrn': rrn,
    'terminalId': terminalId,
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

/**
 * @see https://stackoverflow.com/questions/44985098/angular-export-import-object-getting-object-data
 */

export const allReceiptNumbers = [
  {
    'id': 2,
    'templateName': 'Украинская версия',
    'templateStyle': ':host ::ng-deep code {\n' +
      '  font-size: 100%;\n' +
      '  color: #000000;\n' +
      '}\n' +
      ':host ::ng-deep *{\n' +
      '  margin: 0;\n' +
      '  box-sizing: border-box;\n' +
      '}\n' +
      ':host ::ng-deep li {\n' +
      '  list-style: none;\n' +
      '}\n' +
      ':host ::ng-deep a {\n' +
      '  text-decoration: none;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block {\n' +
      '  display: flex;\n' +
      '  font-family: \'Roboto\', sans-serif;\n' +
      '  text-align: center;\n' +
      '  text-transform: uppercase;\n' +
      '  height: 70vh;\n' +
      '  position: relative;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div {\n' +
      '  margin: auto;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div > p {\n' +
      '  display: flex;\n' +
      '  justify-content: space-between;\n' +
      '  margin: 0;\n' +
      '  box-sizing: border-box;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div > span {\n' +
      '  display: block\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--borderBig {\n' +
      '  margin-bottom: 20px;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--borderSmall {\n' +
      '  margin-bottom: 10px;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--bold {\n' +
      '  font-weight: bold;\n' +
      '  font-size: 1.2rem;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--result {\n' +
      '  background-color: #000000;\n' +
      '  color: #fff;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--footerCenter {\n' +
      '  font-size: 12px;\n' +
      '  text-transform: none;\n' +
      '}',
    'templateBody': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>__NAME_BANK__</span>\n' +
      '    <span>__M_NAME__</span>\n' +
      '    <span class="bill-block__text--borderBig">__M_LOCATION__</span>\n' +
      '    <p>\n' +
      '      <span>Касир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id термінала:</span>\n' +
      '      <code>__TERM_ID__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>__MERCH_ID__</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: __REC_NUM__</code>\n' +
      '    <span class="bill-block__text--bold">__TYPE_OPERATION_TEXT__</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сума:</span>\n' +
      '      <code class="bill-block__text--bold">__AMOUNT__ UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>__IPS__</span>\n' +
      '      <span>__TYPE_OPERATION_CODE__</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>__PAN_MASKA__</code>\n' +
      '      <span>__EXP_DATE__</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">__RESP_TEXT__</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код відповіді</span>\n' +
      '      <code>__RESP_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизації</span>\n' +
      '      <code>__AUTH_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер посилання</span>\n' +
      '      <code>__RRN__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>__SEG_NUM__</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата __TRANSACTION_DATE__</code>\n' +
      '      <code>Час __TRANSACTION_TIME__</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Дякуємо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
    'nameBank': {'key': '__NAME_BANK__', 'value': 'АЛЬФА'},
    'mName': {'key': '__M_NAME__', 'value': 'ТОВ "СОНЕЧКО"'},
    'mLocation': {'key': '__M_LOCATION__', 'value': 'м. Києв, вул. Гарматна, 51 А'},
    'termId': {'key': '__TERM_ID__', 'value': 'cb22bb63'},
    'merchId': {'key': '__MERCH_ID__', 'value': 'acace7e2c7ab'},
    'recNum': {'key': '__REC_NUM__', 'value': '000964'},
    'typeOperation': {'key': '__TYPE_OPERATION_CODE__', 'value': '26'},
    'typeOperationPayTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'оплата'},
    'typeOperationRefundTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'повернення'},
    'amount': {'key': '__AMOUNT__', 'value': 99.99},
    'ips': {'key': '__IPS__', 'value': 'MasterCard'},
    'panMaska': {'key': '__PAN_MASKA__', 'value': '1234************3456'},
    'expDate': {'key': '__EXP_DATE__', 'value': '19/08'},
    'resp': {'key': '__RESP_CODE__', 'value': '00'},
    'respSuccessTxt': {'key': '__RESP_TEXT__', 'value': 'успішно'},
    'respFailureTxt': {'key': '__RESP_TEXT__', 'value': 'неуспішно'},
    'authCode': {'key': '__AUTH_CODE__', 'value': '123456'},
    'rrn': {'key': '__RRN__', 'value': '1857456215'},
    'seqNum': {'key': '__SEG_NUM__', 'value': 10000002},
    'transactionDate': {'key': null, 'value': '2019-08-02T09:56:31.828+0000'},
    'transactionDateForm': {'key': '__TRANSACTION_DATE__', 'value': 'dd/MM/yyyy'},
    'transactionTimeForm': {'key': '__TRANSACTION_TIME__', 'value': 'hh:mm:ss'},
    'transaction': ''
  },
  {
    'id': 3,
    'templateName': 'Русская версия',
    'templateStyle': ':host ::ng-deep code {\n' +
      '  font-size: 100%;\n' +
      '  color: #000000;\n' +
      '}\n' +
      ':host ::ng-deep li {\n' +
      '  list-style: none;\n' +
      '}\n' +
      ':host ::ng-deep a {\n' +
      '  text-decoration: none;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block {\n' +
      '  display: flex;\n' +
      '  font-family: \'Roboto\', sans-serif;\n' +
      '  text-align: center;\n' +
      '  text-transform: uppercase;\n' +
      '  height: 70vh;\n' +
      '  position: relative;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div {\n' +
      '  margin: auto;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div > p {\n' +
      '  display: flex;\n' +
      '  justify-content: space-between;\n' +
      '  margin: 0;\n' +
      '  box-sizing: border-box;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block > div > span {\n' +
      '  display: block\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--borderBig {\n' +
      '  margin-bottom: 20px;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--borderSmall {\n' +
      '  margin-bottom: 10px;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--bold {\n' +
      '  font-weight: bold;\n' +
      '  font-size: 1.2rem;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--result {\n' +
      '  background-color: #000000;\n' +
      '  color: #fff;\n' +
      '}\n' +
      ':host ::ng-deep .bill-block__text--footerCenter {\n' +
      '  font-size: 12px;\n' +
      '  text-transform: none;\n' +
      '}',
    'templateBody': '<div class="bill-block">\n' +
      '  <div>\n' +
      '    <span>__NAME_BANK__</span>\n' +
      '    <span>__M_NAME__</span>\n' +
      '    <span class="bill-block__text--borderBig">__M_LOCATION__</span>\n' +
      '    <p>\n' +
      '      <span>Кассир:</span>\n' +
      '      <span><table width="200"><tr><td></td></tr></table></span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id терминала:</span>\n' +
      '      <code>__TERM_ID__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>id точки:</span>\n' +
      '      <code>__MERCH_ID__</code>\n' +
      '    </p>\n' +
      '    <code class="bill-block__text--bold">ЧЕК: __REC_NUM__</code>\n' +
      '    <span class="bill-block__text--bold">__TYPE_OPERATION_TEXT__</span>\n' +
      '    <p class="bill-block__text--borderSmall">\n' +
      '      <span>сумма:</span>\n' +
      '      <code class="bill-block__text--bold">__AMOUNT__ UAH</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>ips</span>\n' +
      '      <span>__TYPE_OPERATION_CODE__</span>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <code>__PAN_MASKA__</code>\n' +
      '      <span>__EXP_DATE__</span>\n' +
      '    </p>\n' +
      '\n' +
      '    <span class="bill-block__text--result bill-block__text--bold">__RESP_TEXT__</span>\n' +
      '\n' +
      '    <p>\n' +
      '      <span>код ответа</span>\n' +
      '      <code>__RESP_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>код авторизации</span>\n' +
      '      <code>__AUTH_CODE__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>номер отправки</span>\n' +
      '      <code>__RRN__</code>\n' +
      '    </p>\n' +
      '    <p>\n' +
      '      <span>порядковий номер</span>\n' +
      '      <code>__SEG_NUM__</code>\n' +
      '    </p>\n' +
      '    <p class="bill-block__text--borderBig">\n' +
      '      <code>дата __TRANSACTION_DATE__</code>\n' +
      '      <code>Час __TRANSACTION_TIME__</code>\n' +
      '    </p>\n' +
      '    <span class="bill-block__text--bold">Спасибо</span>\n' +
      '    <br><span class="bill-block__text--footerCenter">Transenix</span>\n' +
      '  </div>\n' +
      '</div>',
    'nameBank': {'key': '__NAME_BANK__', 'value': 'АЛЬФА'},
    'mName': {'key': '__M_NAME__', 'value': 'ООО "СОНЕЧКО"'},
    'mLocation': {'key': '__M_LOCATION__', 'value': 'г. Киев, ул. Гарматная, 51 А'},
    'termId': {'key': '__TERM_ID__', 'value': 'cb22bb63'},
    'merchId': {'key': '__MERCH_ID__', 'value': 'acace7e2c7ab'},
    'recNum': {'key': '__REC_NUM__', 'value': '000964'},
    'typeOperation': {'key': '__TYPE_OPERATION_CODE__', 'value': '26'},
    'typeOperationPayTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'оплата'},
    'typeOperationRefundTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': 'возврат'},
    'amount': {'key': '__AMOUNT__', 'value': 99.99},
    'ips': {'key': '__IPS__', 'value': 'MasterCard'},
    'panMaska': {'key': '__PAN_MASKA__', 'value': '1234************3456'},
    'expDate': {'key': '__EXP_DATE__', 'value': '19/08'},
    'resp': {'key': '__RESP_CODE__', 'value': '00'},
    'respSuccessTxt': {'key': '__RESP_TEXT__', 'value': 'успешно'},
    'respFailureTxt': {'key': '__RESP_TEXT__', 'value': 'неуспешно'},
    'authCode': {'key': '__AUTH_CODE__', 'value': '123456'},
    'rrn': {'key': '__RRN__', 'value': '1857456215'},
    'seqNum': {'key': '__SEG_NUM__', 'value': 10000002},
    'transactionDate': {'key': null, 'value': '2019-08-02T09:56:31.828+0000'},
    'transactionDateForm': {'key': '__TRANSACTION_DATE__', 'value': 'dd/MM/yyyy'},
    'transactionTimeForm': {'key': '__TRANSACTION_TIME__', 'value': 'hh:mm:ss'},
    'transaction': ''
  }
];
