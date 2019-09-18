/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface BankInfoModel {
  id: any;
  name: any;
  address: any;
  phone: any;
  email: any;
  instructions: any;
  appVersion: any;
}


export function dtoToBankInfo(src: any) {
  const name = (src.name===undefined) ? '' : src.name;

  const dest: any = {
    'id': src.id,
    'name': name,
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
    'name': src.name,
    'address': src.address,
    'phone': src.phone,
    'email': src.email,
    'instructions': src.instructions,
    'appVersion': src.appVersion
  };
  return dest;
}
