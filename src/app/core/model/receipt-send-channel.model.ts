import { DataService } from '../../core/service/data.service';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ReceiptSendChannelModel {
  id: any;
  receiptSendChannelType: any;
  name: any;
  enabled: any;
}


export function dtoToReceiptSendChannel(src: any) {
  const receiptSendChannelNames: any = [];

  const labelBasic = ' (базовый)';
  const dataService: DataService = new DataService();
  const basicReceiptSendChannels = dataService.getBasicReceiptSendChannels();
  for (let r = 0; r < src.length; r++) {
    for (let b = 0; b < basicReceiptSendChannels.length; b++) {
      if (basicReceiptSendChannels[b] === src[r].name) {
        receiptSendChannelNames.push(src[r].name + labelBasic);
      } else {
        receiptSendChannelNames.push(src[r].name);
      }
    }
  }
  return receiptSendChannelNames;
}


export function receiptSendChannelToDto(dto: any, src: any) {
  const receiptSendChannels: any = [];

  const labelBasic = ' (базовый)';
  for (let s = 0; s < src.length; s++) {
    for (let d = 0; d < dto.length; d++) {
      const receiptSendChannel: any = dto[d];
      if (src[s] === receiptSendChannel.name || src[s] === receiptSendChannel.name + labelBasic) {
        receiptSendChannels.push(receiptSendChannel.id);
      }
    }
  }
  return receiptSendChannels;
}
