/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ProductModel {
  productId: any;
  productName: any;
  ipsName: any;
  ipsSymbol: any;
  ipsCardGroupId: any;
  rangeBegin: any;
  rangeEnd: any;
}


export function dtoToProduct(src: any) {
  const ipsName = src.ipsCardGroup.ipsName;
  const ipsCardGroupId = src.ipsCardGroup.ipsCardGroupId;
  const ipsSymbol = src.ipsCardGroup.ipsSymbol;

  const dest: any = {
    'productId': src.productId,
    'productName': src.productName,
    'ipsName': ipsName,
    'ipsCardGroupId': ipsCardGroupId,
    'ipsSymbol': ipsSymbol,
    'rangeBegin': src.rangeBegin,
    'rangeEnd': src.rangeEnd
  };
  return dest;
}

export function productToUpdate(src: any) {
  const dest = {
    'ipsCardGroupId': src.ipsCardGroupId,
    'productName': src.productName,
    'rangeBegin': src.rangeBegin,
    'rangeEnd': src.rangeEnd
  };
  return dest;
}

export function productNew() {
  const dest = {
    'productId': null,
    'productName': null,
    'ipsName': null,
    'ipsCardGroupId': null,
    'ipsSymbol': null,
    'rangeBegin': null,
    'rangeEnd': null,
  };
  return dest;
}
