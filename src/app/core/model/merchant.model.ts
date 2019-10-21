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

interface FilterMerchantModel {
  merchantId: any;
  merchantName: any;
}

export function filterMerchantToUrl(src: any) {
  let dest: string = '';

  if (src.merchantId !== '' && src.merchantId !== null && src.merchantId !== undefined) {
    dest += 'merchantId=' + src.merchantId;
  }
  if (src.shortMerchantId !== '' && src.shortMerchantId !== null && src.shortMerchantId !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'shortMerchantId=' + src.shortMerchantId;
  }
  if (src.mcc !== '' && src.mcc !== null && src.mcc !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'mcc=' + src.mcc;
  }
  if (src.merchantLegalName !== '' && src.merchantLegalName !== null && src.merchantLegalName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantLegalName=' + src.merchantLegalName;
  }
  if (src.merchantLocation !== '' && src.merchantLocation !== null && src.merchantLocation !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantLocation=' + src.merchantLocation;
  }
  if (src.merchantName !== '' && src.merchantName !== null && src.merchantName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'merchantName=' + src.merchantName;
  }
  if (src.taxId !== '' && src.taxId !== null && src.taxId !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'taxId=' + src.taxId;
  }
  if (src.bankName !== '' && src.bankName !== null && src.bankName !== undefined) {
    if (dest !== '') dest += '&';
    dest += 'bankName=' + src.bankName;
  }
  if (dest !== '') {
    dest = '?' + dest;
  }

  return dest;
}

export function filterMerchantEmpty() {
  const dest = {
    'merchantId': null,
    'shortMerchantId': null,
    'mcc': null,
    'merchantLegalName': null,
    'merchantLocation': null,
    'merchantName': null,
    'taxId': null,
    'bankName': null
  };
  return dest;
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
