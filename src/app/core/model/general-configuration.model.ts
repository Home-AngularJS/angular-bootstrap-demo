/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface GeneralConfigurationModel {
  appActiveTime: any;
  currency: any;
  hostId: any;
  language: any;
  noPinLimitMcStandard: any;
  noPinLimitVisaStandard: any;
  minReceiptNumber: any;
  maxReceiptNumber: any;
  pendingNumber: any;
  pendingTime: any;
  timeZReport: any;
  phoneMask: any;
  receiptHost: any;
  beginCardMask: any;
  endCardMask: any;
  cardMaskSymbol: any;
}


export function dtoToGeneralConfiguration(src: any) {
  const appActiveTimeHour = '00';
  const appActiveTimeMinute = '00';

  const dest = {
    // 'appActiveTime': src.appActiveTime,
    'appActiveTimeHour': appActiveTimeHour,
    'appActiveTimeMinute': appActiveTimeMinute,
    'currency': src.currency,
    'hostId': src.hostId,
    'language': src.language,
    'noPinLimitMcStandard': src.noPinLimitMcStandard,
    'noPinLimitVisaStandard': src.noPinLimitVisaStandard,
    'minReceiptNumber': src.minReceiptNumber,
    'maxReceiptNumber': src.maxReceiptNumber,
    'pendingNumber': src.pendingNumber,
    'pendingTime': src.pendingTime,
    'timeZReport': src.timeZReport,
    'phoneMask': src.phoneMask,
    'receiptHost': src.receiptHost,
    'beginCardMask': src.beginCardMask,
    'endCardMask': src.endCardMask,
    'cardMaskSymbol': src.cardMaskSymbol
  };
  return dest;
}


export function generalConfigurationToDto(src: any) {
  const dest = {
    'appActiveTime': src.appActiveTime,
    'currency': src.currency,
    'hostId': src.hostId,
    'language': src.language,
    'noPinLimitMcStandard': src.noPinLimitMcStandard,
    'noPinLimitVisaStandard': src.noPinLimitVisaStandard,
    'minReceiptNumber': src.minReceiptNumber,
    'maxReceiptNumber': src.maxReceiptNumber,
    'pendingNumber': src.pendingNumber,
    'pendingTime': src.pendingTime,
    'timeZReport': src.timeZReport,
    'phoneMask': src.phoneMask,
    'receiptHost': src.receiptHost,
    'beginCardMask': src.beginCardMask,
    'endCardMask': src.endCardMask,
    'cardMaskSymbol': src.cardMaskSymbol
  };
  return dest;
}
