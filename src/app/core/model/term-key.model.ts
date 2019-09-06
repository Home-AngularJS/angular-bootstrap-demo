import * as moment from 'moment';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

interface TermKeyModel {
  id: any;
  checkValue: any;
  effDate: any;
  expDate: any;
  keyType: any;
  keyValue: any;
  refCode: any;
  statCode: any;
}


export function dtoToTermKey(src: any) {
  const effDate = dateTimeToJsDate(src.effDate);
  const expDate = dateTimeToJsDate(src.expDate);

  const dest: any = {
    'id': src.id,
    'checkValue': src.checkValue,
    'effDate': effDate,
    'expDate': expDate,
    'keyType': src.keyType,
    'keyValue': src.keyValue,
    'refCode': src.refCode,
    'statCode': src.statCode
  };
  return dest;
}

export function termKeyToDto(oldDto: any, src: any) {
  const effDate = dateToDateTime(oldDto.effDate, src.effDate);
  const expDate = dateToDateTime(oldDto.expDate, src.expDate);

  const dest = {
    'id': src.id,
    'checkValue': src.checkValue,
    'effDate': effDate,
    'expDate': expDate,
    'keyType': src.keyType,
    'keyValue': src.keyValue,
    'refCode': src.refCode,
    'statCode': src.statCode
  };
  return dest;
}

export function termKeyNew() {
  const dest = {
    'id': null,
    'checkValue': null,
    'effDate': null,
    'expDate': null,
    'keyType': null,
    'keyValue': null,
    'refCode': null,
    'statCode': null
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
