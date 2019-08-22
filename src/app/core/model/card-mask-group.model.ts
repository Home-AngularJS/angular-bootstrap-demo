import {CardMaskGroupComponent} from '../../layout/card-mask-group/card-mask-group.component';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface CardMaskGroupModel {
  id: any;
  beginMask: any;
  endMask: any;
  maskSymbol: any;
}


export function dtoToCardMaskGroup(src: any) {
  const dest: any = {
    'id': src.id,
    'beginMask': src.beginMask,
    'endMask': src.endMask,
    'maskSymbol': src.maskSymbol
  };
  return dest;
}

export function cardMaskGroupToDto(src: any) {
  const dest = {
    'id': src.id,
    'beginMask': src.beginMask,
    'endMask': src.endMask,
    'maskSymbol': src.maskSymbol
  };
  return dest;
}

export function cardMaskGroupNew() {
  const dest = {
    'id': null,
    'beginMask': null,
    'endMask': null,
    'maskSymbol': null
  };
  return dest;
}
