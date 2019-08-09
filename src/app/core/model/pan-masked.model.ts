/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface PanMaskedModel {
  id: any;
  beginMask: any;
  endMask: any;
  maskSymbol: any;
}


export function dtoToPanMasked(src: any) {
  const dest: any = {
    "id": src.id,
    "beginMask": src.beginMask,
    "endMask": src.endMask,
    "maskSymbol": src.maskSymbol
  };
  return dest;
}

export function panMaskedGroupsToDto(src: any) {
  const dest = {
    "id": src.id,
    "beginMask": src.beginMask,
    "endMask": src.endMask,
    "maskSymbol": src.maskSymbol
  };
  return dest;
}

export function panMaskedNew() {
  const dest = {
    "id": null,
    "beginMask": null,
    "endMask": null,
    "maskSymbol": null
  };
  return dest;
}
