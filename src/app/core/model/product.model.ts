/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ProductModel {
  productId: any;
  productName: any;
  ipsName: any;
  ipsSymbol: any;
  rangeBegin: any;
  rangeEnd: any;
}


export function dtoToProduct(src: any) {
  const ipsName = src.ipsCardGroup.ipsName;
  const ipsSymbol = src.ipsCardGroup.ipsSymbol;

  const dest: any = {
    'productId': src.productId,
    'productName': src.productName,
    'ipsName': ipsName,
    'ipsSymbol': ipsSymbol,
    'rangeBegin': src.rangeBegin,
    'rangeEnd': src.rangeEnd
  };
  return dest;
}

export function productToDto(src: any) {
  const dest = {
    'productId': src.productId,
    'productName': src.productName,
    'ipsCardGroup': {
      'ipsName': src.ipsName,
      'ipsSymbol': src.ipsSymbol
    },
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
    'ipsSymbol': null,
    'rangeBegin': null,
    'rangeEnd': null,
  };
  return dest;
}
