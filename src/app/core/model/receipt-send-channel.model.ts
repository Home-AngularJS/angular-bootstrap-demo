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
  for (let i = 0; i < src.length; i++) {
    receiptSendChannelNames.push(src[i].name);
  }
  return receiptSendChannelNames;
}


export function receiptSendChannelToDto(dto: any, src: any) {
  const receiptSendChannels: any = [];
  for (let s = 0; s < src.length; s++) {
    for (let d = 0; d < dto.length; d++) {
      const receiptSendChannel: any = dto[d];
      if (src[s] === receiptSendChannel.name) {
        receiptSendChannels.push(receiptSendChannel.id);
      }
    }
  }
  return receiptSendChannels;
}
