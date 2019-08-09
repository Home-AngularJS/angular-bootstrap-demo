/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface SettingsModel {
  appActiveTime: any;
  changeDevice: any;
  currency: any;
  dtPinInput: any;
  hostId: any;
  language: any;
  limitMcStandard: any;
  limitVisaStandard: any;
  maxReceiptNumber: any;
  pendingNumber: any;
  pendingTime: any;
  receiptNumber: any;
  timeZReport: any;
}


export function dtoToSettings(src: any) {
  const dest = {
    "appActiveTime": src.appActiveTime,
    "changeDevice": src.changeDevice,
    "currency": src.currency,
    "dtPinInput": src.dtPinInput,
    "hostId": src.hostId,
    "language": src.language,
    "limitMcStandard": src.limitMcStandard,
    "limitVisaStandard": src.limitVisaStandard,
    "maxReceiptNumber": src.maxReceiptNumber,
    "pendingNumber": src.pendingNumber,
    "pendingTime": src.pendingTime,
    "receiptNumber": src.receiptNumber,
    "timeZReport": src.timeZReport
  };
  return dest;
}


export function settingsToDto(src: any) {
  const dest = {
    "appActiveTime": src.appActiveTime,
    "changeDevice": src.changeDevice,
    "currency": src.currency,
    "dtPinInput": src.dtPinInput,
    "hostId": src.hostId,
    "language": src.language,
    "limitMcStandard": src.limitMcStandard,
    "limitVisaStandard": src.limitVisaStandard,
    "maxReceiptNumber": src.maxReceiptNumber,
    "pendingNumber": src.pendingNumber,
    "pendingTime": src.pendingTime,
    "receiptNumber": src.receiptNumber,
    "timeZReport": src.timeZReport
  };
  return dest;
}
