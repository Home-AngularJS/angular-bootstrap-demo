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
  basicReceiptSendChannels: any;
}


export function dtoToGeneralConfiguration(src: any) {
  const language: any = [];
  // for (let i = 0; i < src.language.length; i++) {
    // language.push(src.language[i].languageId);
  // }
  language.push(src.language.languageId);

  if (!src.basicReceiptSendChannels) {
    src.basicReceiptSendChannels = null;
  }

  const dest = {
    'appActiveTime': src.appActiveTime,
    'currency': src.currency,
    'hostId': src.hostId,
    'language': language,
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
    'cardMaskSymbol': src.cardMaskSymbol,
    'basicReceiptSendChannels': src.basicReceiptSendChannels
  };
  return dest;
}


export function generalConfigurationToDto(allReceiptSendChannelsDto: any, src: any) {
  const language = { 'languageId': src.language[0] };
  const timeZReport = (src.timeZReport.split(":").length === 2) ? src.timeZReport + ':00' : src.timeZReport;

  const receiptSendChannelIdList: any = [];
  for (let a = 0; a < allReceiptSendChannelsDto.length; a++) {
    for (let b = 0; b < src.basicReceiptSendChannels.length; b++) {
      if (allReceiptSendChannelsDto[a].name === src.basicReceiptSendChannels[b]) {
        receiptSendChannelIdList.push(allReceiptSendChannelsDto[a]);
      }
    }
  }

  const dest = {
    'appActiveTime': src.appActiveTime,
    'currency': src.currency,
    'hostId': src.hostId,
    'language': language,
    'noPinLimitMcStandard': src.noPinLimitMcStandard,
    'noPinLimitVisaStandard': src.noPinLimitVisaStandard,
    'minReceiptNumber': src.minReceiptNumber,
    'maxReceiptNumber': src.maxReceiptNumber,
    'pendingNumber': src.pendingNumber,
    'pendingTime': src.pendingTime,
    'timeZReport': timeZReport,
    'phoneMask': src.phoneMask,
    'receiptHost': src.receiptHost,
    'beginCardMask': src.beginCardMask,
    'endCardMask': src.endCardMask,
    'cardMaskSymbol': src.cardMaskSymbol,
    'receiptSendChannelIdList': receiptSendChannelIdList
  };
  return dest;
}
