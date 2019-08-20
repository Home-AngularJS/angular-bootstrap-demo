/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface SettingsModel {
  appActiveTime: any;
  changeDevice: any;
  currency: any;
  // dtPinInput: any;
  hostId: any;
  language: any;
  limitMcStandard: any;
  limitVisaStandard: any;
  minReceiptNumber: any;
  maxReceiptNumber: any;
  pendingNumber: any;
  pendingTime: any;
  timeZReport: any;
}


export function dtoToSettings(src: any) {
  const dest = {
    "appActiveTime": src.appActiveTime,
    "currency": src.currency,
    "hostId": src.hostId,
    "language": src.language,
    "limitMcStandard": src.limitMcStandard,
    "limitVisaStandard": src.limitVisaStandard,
    "minReceiptNumber": src.minReceiptNumber,
    "maxReceiptNumber": src.maxReceiptNumber,
    "pendingNumber": src.pendingNumber,
    "pendingTime": src.pendingTime,
    "timeZReport": src.timeZReport
  };
  return dest;
}


export function settingsToDto(src: any) {
  const dest = {
    "appActiveTime": src.appActiveTime,
    "currency": src.currency,
    "hostId": src.hostId,
    "language": src.language,
    "limitMcStandard": src.limitMcStandard,
    "limitVisaStandard": src.limitVisaStandard,
    "minReceiptNumber": src.minReceiptNumber,
    "maxReceiptNumber": src.maxReceiptNumber,
    "pendingNumber": src.pendingNumber,
    "pendingTime": src.pendingTime,
    "timeZReport": src.timeZReport
  };
  return dest;
}
