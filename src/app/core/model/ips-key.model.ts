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
  const keyExpDate = dateTimeToJsDate(src.keyExpDate);

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
    'keyExpDate': keyExpDate,
    'scheme': src.scheme
  };
  return dest;
}

export function ipsKeyToDto(oldDto: any, src: any) {
  const keyExpDate = dateToDateTime(oldDto.keyExpDate, src.keyExpDate);

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


/**
 * @see https://www.tutorialspoint.com/typescript/typescript_string_split.htm
 */
function dateToDateTime(oldDateTime: any, newDateTime: any) {
  console.log('oldDateTime:' + oldDateTime)
  console.log('newDateTime:' + newDateTime)

  const splitted: string = 'T';
  const formatDate: string = 'YYYY-MM-DDTHH:mm:ss.sssZZ';

  const dtCurr = moment()
                  .format(formatDate)
                  .split(splitted, 2);

  /**
   * №1 - новая дата, старое время (date+date)
   */
  if (!isEmpty(oldDateTime) && !isEmpty(newDateTime)) {
    const dtNew: any = moment(newDateTime.jsdate)
                        .format(formatDate)
                        .split(splitted, 2);
    const dtOld: any = oldDateTime.split(splitted, 2);
    return dtNew[0] + splitted + dtOld[1];
  }

  /**
   * №2 - новая дата, текущее время (null+date)
   */
  if (isEmpty(oldDateTime) && !isEmpty(newDateTime)) {
    const dtNew: any = moment(newDateTime.jsdate)
                        .format(formatDate)
                        .split(splitted, 2);
    return dtNew[0] + splitted + dtCurr[1];
  }

  /**
   * №3 - старая дата, старое время (date+null)
   */
  if (!isEmpty(oldDateTime) && isEmpty(newDateTime)) {
    const dtOld: any = oldDateTime.split(splitted, 2);
    return dtOld[0] + splitted + dtOld[1];
  }

  /**
   * №4 - ничего (null+null)
   */
  return null;
}

function dateTimeToJsDate(dateTime: any) {
  return !isEmpty(dateTime) ? { jsdate: new Date(dateTime) } : null;
}

/**
 * https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in?rq=1
 */
function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
