/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface MerchantModel {
  merchantId: any;
  mcc: any;
  merchantLegalName: any;
  merchantLocation: any;
  merchantName: any;
  taxId: any;
  bankName: any;
}


export function dtoToMerchant(src: any) {
  const dest: any = {
    'merchantId': src.merchantId,
    'mcc': src.mcc,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'merchantName': src.merchantName,
    'taxId': src.taxId,
    'bankName': src.bank.name
  };
  return dest;
}

export function merchantToDto(src: any) {
  const dest = {
    'merchantId': src.merchantId,
    'mcc': src.mcc,
    'merchantLegalName': src.merchantLegalName,
    'merchantLocation': src.merchantLocation,
    'merchantName': src.merchantName,
    'taxId': src.taxId
  };
  return dest;
}
