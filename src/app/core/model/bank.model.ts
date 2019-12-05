/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface BankModel {
  id: any;
  name: any;
  address: any;
  email: any;
  phone: any;
  taxId: any;
  mfo: any;
  instructions: any;
}


export function dtoToBank(src: any) {
  const dest: any = {
    'id': src.id,
    'name': src.name,
    'address': src.address,
    'email': src.email,
    'phone': src.phone,
    'taxId': src.taxId,
    'mfo': src.mfo,
    'instructions': src.instructions
  };
  return dest;
}

export function bankToDto(src: any) {
  const dest = {
    'id': src.id,
    'name': src.name,
    'address': src.address,
    'email': src.email,
    'phone': src.phone,
    'taxId': src.taxId,
    'mfo': src.mfo,
    'instructions': src.instructions
  };
  return dest;
}

export function bankNew() {
  const dest = {
    'id': null,
    'name': null,
    'address': null,
    'email': null,
    'phone': null,
    'taxId': null,
    'mfo': null,
    'instructions': null
  };
  return dest;
}

export function createNewBank(src: any) {
  const dest = {
    'name': src.name,
    'address': src.address,
    'email': src.email,
    'phone': src.phone,
    'taxId': src.taxId,
    'mfo': src.mfo,
    'instructions': src.instructions
  };
  return dest;
}
