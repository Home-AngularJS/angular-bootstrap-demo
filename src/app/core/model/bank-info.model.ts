/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface BankInfoModel {
  id: any;
  address: any;
  phone: any;
  email: any;
  instructions: any;
  appVersion: any;
}


export function dtoToBankInfo(src: any) {
  const dest: any = {
    'id': src.id,
    'address': src.address,
    'phone': src.phone,
    'email': src.email,
    'instructions': src.instructions,
    'appVersion': src.appVersion
  };
  return dest;
}

export function bankInfoToDto(src: any) {
  const dest = {
    'id': src.id,
    'address': src.address,
    'phone': src.phone,
    'email': src.email,
    'instructions': src.instructions,
    'appVersion': src.appVersion
  };
  return dest;
}
