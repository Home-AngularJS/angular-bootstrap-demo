/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface MerchantModel {
  merchantId: any;
  merchantName: any;
  merchantLocation: any;
  taxId: any;
  mcc: any;
  acquirerId: any;
}


export function dtoToMerchant(src: any) {
  const merchantId = src.merchantId.substring(0, 10)

  const dest: any = {
    'merchantId': merchantId,
    'merchantName': src.merchantName,
    'merchantLocation': src.merchantLocation,
    'taxId': src.taxId,
    'mcc': src.mcc,
    'acquirerId': src.acquirerId
  };
  return dest;
}

export function merchantToDto(src: any) {
  const dest = {
    'merchantId': src.merchantId,
    'merchantName': src.merchantName,
    'merchantLocation': src.merchantLocation,
    'taxId': src.taxId,
    'mcc': src.mcc,
    'acquirerId': src.acquirerId
  };
  return dest;
}
