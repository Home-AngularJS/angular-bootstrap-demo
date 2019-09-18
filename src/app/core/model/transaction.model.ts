/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface TransactionModel {
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

interface FilterTransactionModel {
  panMasked: any;
  approvalCode: any;
  rrn: any;
  terminalId: any;
}

export function filterTransactionToUrl(src: any) {
  let dest: string = '';

  if (src.panMasked !== '' && src.panMasked !== null) {
    dest += 'panMasked=' + src.panMasked;
  }
  if (src.approvalCode !== '' && src.approvalCode !== null) {
    if (dest !== '') dest += '&';
    dest += 'approvalCode=' + src.approvalCode;
  }
  if (src.rrn !== '' && src.rrn !== null) {
    if (dest !== '') dest += '&';
    dest += 'rrn=' + src.rrn;
  }
  if (src.terminalId !== '' && src.terminalId !== null) {
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
    'panMasked': null,
    'approvalCode': null,
    'rrn': null,
    'terminalId': null
  };
  return dest;
}

export function dtoToTransaction(src: any) {
  const transactionId = src.transactionId.replace( '-', '').substring(0, 10)

  const dest: any = {
    'amount': src.amount,
    'amountOther': src.amountOther,
    'approvalCode': src.approvalCode,
    'currency': src.currency,
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
    'responseDate': src.responseDate,
    'addField': src.addField,
    'lastRefundDate': src.lastRefundDate
  };
  if (!isEmpty(src.device)) {
    dest.appId = src.device.appId;
    dest.appStatus = src.device.appStatus;
    dest.appVersion = src.device.appVersion;
    dest.deviceFingerprint = src.device.deviceFingerprint;
    dest.deviceName = src.device.deviceName;
    dest.deviceSn = src.device.deviceSn;
    dest.deviceStatus = src.device.deviceStatus;
    dest.imei = src.device.imei;
    dest.initDate = src.device.initDate;
    dest.osVersion = src.device.osVersion;
    dest.serialNumber = src.device.serialNumber;
    dest.terminalId = src.device.terminal.terminalId;
    dest.groupNumber = src.device.terminal.groupNumber;
    dest.opPurchase = src.device.terminal.opPurchase;
    dest.opReversal = src.device.terminal.opReversal;
    dest.opRefund = src.device.terminal.opRefund;
    dest.opQr = src.device.terminal.opQr;
    dest.manual = src.device.terminal.manual;
    dest.pin = src.device.terminal.pin;
    dest.geoPosition = src.device.terminal.geoPosition;
    dest.oneTransactionLimit = src.device.terminal.oneTransactionLimit;
    dest.noPinLimit = src.device.terminal.noPinLimit;
    dest.configChanged = src.device.terminal.configChanged;
    dest.dateTimeInit = src.device.terminal.dateTimeInit;
    dest.beginMask = src.device.terminal.beginMask;
    dest.endMask = src.device.terminal.endMask;
    dest.maskSymbol = src.device.terminal.maskSymbol;
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

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 */
function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
