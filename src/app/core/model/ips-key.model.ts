import * as moment from 'moment';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

interface IpsKeyModel {
  id: any;
  rid: any;
  index: any;
  exponentLength: any;
  exponentValue: any;
  modulusLength: any;
  modulus: any;
  secureHashAlg: any;
  caHashAlgInd: any;
  caPkAlgInd: any;
  keyExpDate: any;
  scheme: any;
}


export function dtoToIpsKey(src: any) {
  const dest: any = {
    'id': src.id,
    'rid': src.rid,
    'index': src.index,
    'exponentLength': src.exponentLength,
    'exponentValue': src.exponentValue,
    'modulusLength': src.modulusLength,
    'modulus': src.modulus,
    'secureHashAlg': src.secureHashAlg,
    'caHashAlgInd': src.caHashAlgInd,
    'caPkAlgInd': src.caPkAlgInd,
    'keyExpDate': src.keyExpDate,
    'scheme': src.scheme
  };
  return dest;
}

export function ipsKeyToDto(src: any) {
  const keyExpDate = moment(src.keyExpDate.jsdate).format('YYYY-MM-DDTHH:mm:ss.sssZZ');

  const dest = {
    'id': src.id,
    'rid': src.rid,
    'index': src.index,
    'exponentLength': src.exponentLength,
    'exponentValue': src.exponentValue,
    'modulusLength': src.modulusLength,
    'modulus': src.modulus,
    'secureHashAlg': src.secureHashAlg,
    'caHashAlgInd': src.caHashAlgInd,
    'caPkAlgInd': src.caPkAlgInd,
    'keyExpDate': keyExpDate,
    'scheme': src.scheme
  };
  return dest;
}

export function ipsKeyNew() {
  const dest = {
    'id': null,
    'rid': null,
    'index': null,
    'exponentLength': null,
    'exponentValue': null,
    'modulusLength': null,
    'modulus': null,
    'secureHashAlg': null,
    'caHashAlgInd': null,
    'caPkAlgInd': null,
    'keyExpDate': null,
    'scheme': null,
  };
  return dest;
}
