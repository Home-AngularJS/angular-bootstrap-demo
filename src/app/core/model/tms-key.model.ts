/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface TmsKeyModel {
  id: any;
  checkValue: any;
  effDate: any;
  expDate: any;
  keyType: any;
  keyValue: any;
  refCode: any;
  statCode: any;
}


export function dtoToTmsKey(src: any) {
  const dest: any = {
    "id": src.id,
    "checkValue": src.checkValue,
    "effDate": src.effDate,
    "expDate": src.expDate,
    "keyType": src.keyType,
    "keyValue": src.keyValue,
    "refCode": src.refCode,
    "statCode": src.statCode
  };
  return dest;
}

export function tmsKeyToDto(src: any) {
  const dest = {
    "id": src.id,
    "checkValue": src.checkValue,
    "effDate": src.effDate,
    "expDate": src.expDate,
    "keyType": src.keyType,
    "keyValue": src.keyValue,
    "refCode": src.refCode,
    "statCode": src.statCode
  };
  return dest;
}

export function tmsKeyNew() {
  const dest = {
    "id": null,
    "checkValue": null,
    "effDate": null,
    "expDate": null,
    "keyType": null,
    "keyValue": null,
    "refCode": null,
    "statCode": null
  };
  return dest;
}
