/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface IpsCardGroupModel {
  ipsCardGroupId: any;
  ipsName: any;
  ipsSymbol: any;
  firstCardNum: any;
  noPinLimit: any;
  pin: any;
}


export function dtoToIpsCardGroup(src: any) {
  const dest: any = {
    'ipsCardGroupId': src.ipsCardGroupId,
    'ipsName': src.ipsName,
    'ipsSymbol': src.ipsSymbol,
    'firstCardNum': src.firstCardNum,
    'noPinLimit': src.noPinLimit,
    'pin': src.pin
  };
  return dest;
}

export function ipsCardGroupToCreate(src: any) {
  const dest = {
    'ipsName': src.ipsName,
    'ipsSymbol': src.ipsSymbol,
    'firstCardNum': src.firstCardNum,
    'noPinLimit': src.noPinLimit,
    'pin': src.pin
  };
  return dest;
}

export function ipsCardGroupNew() {
  const dest = {
    'ipsCardGroupId': null,
    'ipsName': null,
    'ipsSymbol': null,
    'firstCardNum': null,
    'noPinLimit': null,
    'pin': null
  };
  return dest;
}
