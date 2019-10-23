/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface IpsCardGroupModel {
  ipsCardGroupId: any;
  ipsName: any;
  ipsSymbol: any;
  firstCardNum : any;
}


export function dtoToIpsCardGroup(src: any) {
  const dest: any = {
    'ipsCardGroupId': src.ipsCardGroupId,
    'ipsName': src.ipsName,
    'ipsSymbol': src.ipsSymbol,
    'firstCardNum': src.firstCardNum
  };
  return dest;
}

export function ipsCardGroupToCreate(src: any) {
  const dest = {
    'ipsName': src.ipsName,
    'ipsSymbol': src.ipsSymbol,
    'firstCardNum': src.firstCardNum
  };
  return dest;
}

export function ipsCardGroupNew() {
  const dest = {
    'ipsCardGroupId': null,
    'ipsName': null,
    'ipsSymbol': null,
    'firstCardNum': null
  };
  return dest;
}
