/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
import { multiselectToEntity } from './receipt-send-channel.model';

interface GeneralConfigurationModel {
  appActiveTime: any;
  currency: any;
  hostId: any;
  language: any;
  attestationTimeMin: any;
  attestationTimeMax: any;
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
    'attestationTimeMin': src.attestationTimeMin,
    'attestationTimeMax': src.attestationTimeMax,
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
  multiselectToEntity(src.language);
  const language = { 'languageId': src.language[0] };
  const timeZReport = (src.timeZReport.split(":").length === 2) ? src.timeZReport + ':00' : src.timeZReport;
  const attestationTimeMin = (src.attestationTimeMin.split(":").length === 2) ? src.attestationTimeMin + ':00' : src.attestationTimeMin;
  const attestationTimeMax = (src.attestationTimeMax.split(":").length === 2) ? src.attestationTimeMax + ':00' : src.attestationTimeMax;

  const labelBasic = ' (базовый)';
  const receiptSendChannelIdList: any = [];
  for (let a = 0; a < allReceiptSendChannelsDto.length; a++) {
    for (let b = 0; b < src.basicReceiptSendChannels.length; b++) {
      if (allReceiptSendChannelsDto[a].name === src.basicReceiptSendChannels[b] || allReceiptSendChannelsDto[a].name + labelBasic === src.basicReceiptSendChannels[b]) {
        receiptSendChannelIdList.push(allReceiptSendChannelsDto[a]);
      }
    }
  }

  const dest = {
    'appActiveTime': src.appActiveTime,
    'currency': src.currency,
    'hostId': src.hostId,
    'language': language,
    'attestationTimeMin': attestationTimeMin,
    'attestationTimeMax': attestationTimeMax,
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
    // 'receiptSendChannelIdList': receiptSendChannelIdList
  };
  return dest;
}
