/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface BankModel {
  address: any;
  id: any;
  mfo: any;
  name: any;
  phoneNumber: any;
  taxId: any;
}


export function dtoToBank(src: any) {
  const dest: any = {
    'address': src.address,
    'id': src.id,
    'mfo': src.mfo,
    'name': src.name,
    'phoneNumber': src.phoneNumber,
    'taxId': src.taxId
  };
  return dest;
}

export function bankToDto(src: any) {
  const dest = {
    'address': src.address,
    'id': src.id,
    'mfo': src.mfo,
    'name': src.name,
    'phoneNumber': src.phoneNumber,
    'taxId': src.taxId
  };
  return dest;
}
