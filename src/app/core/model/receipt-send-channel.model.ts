import { DataService } from '../../core/service/data.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

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
  //TODO: do mark label
  var receiptSendChannelNames: any = [];
  const labelBasic = ' (базовый)';
  const dataService: DataService = new DataService();
  const basicReceiptSendChannels = dataService.getBasicReceiptSendChannels();
  for (let r = 0; r < src.length; r++) {
    var labelBasicReceiptSendChannels = src[r].name;
    for (let b = 0; b < basicReceiptSendChannels.length; b++) {
      if (basicReceiptSendChannels[b] === src[r].name) {
        labelBasicReceiptSendChannels = src[r].name + labelBasic;
      } else {
      }
    }
    receiptSendChannelNames.push(labelBasicReceiptSendChannels);
  }

  //TODO: do sort
  const baseReceiptSendChannelNames: any = [];
  const anotherReceiptSendChannelNames: any = [];
  for (let r = 0; r < receiptSendChannelNames.length; r++) {
    const indexOf = receiptSendChannelNames[r].indexOf(labelBasic);
    if (indexOf === -1) {
      anotherReceiptSendChannelNames.push(receiptSendChannelNames[r]);
    } else {
      baseReceiptSendChannelNames.push(receiptSendChannelNames[r]);
    }
  }

  //TODO: create sorted list
  receiptSendChannelNames = [];
  for (let b = 0; b < baseReceiptSendChannelNames.length; b++) {
    receiptSendChannelNames.push(baseReceiptSendChannelNames[b].replace(labelBasic, ''));
  }
  for (let a = 0; a < anotherReceiptSendChannelNames.length; a++) {
    receiptSendChannelNames.push(anotherReceiptSendChannelNames[a]);
  }
  return receiptSendChannelNames;
}

export function multiselectToEntity(src: any) {
  for (let s = 0; s < src.length; s++) src[s] = (src[s].id !== undefined) ? src[s].id : src[s];
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
