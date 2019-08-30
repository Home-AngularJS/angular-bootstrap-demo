/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface Transaction {
  transactionId: any;
  amount: any;
  amountOther: any;
  currency: any;
  operation: any;
  panMasked: any;
  panSn: any;
  transactionDate: any;
  formFactor: any;
  approvalCode: any;
  responseCode: any;
  rrn: any;
  statusCode: any;
}


export function dtoToTransaction(src: any) {
  const transactionId = src.transactionId.substring(0, 10)

  const dest: any = {
    'transactionId': transactionId,
    'amount': src.amount,
    'amountOther': src.amountOther,
    'currency': src.currency,
    'operation': src.operation,
    'panMasked': src.panMasked,
    'panSn': src.panSn,
    'transactionDate': src.transactionDate,
    'formFactor': src.formFactor,
    'approvalCode': src.approvalCode,
    'responseCode': src.responseCode,
    'rrn': src.rrn,
    'statusCode': src.statusCode
  };
  return dest;
}

export function transactionToDto(src: any) {
  const dest = {
    'transactionId': src.transactionId,
    'amount': src.amount,
    'amountOther': src.amountOther,
    'currency': src.currency,
    'operation': src.operation,
    'panMasked': src.panMasked,
    'panSn': src.panSn,
    'transactionDate': src.transactionDate,
    'formFactor': src.formFactor,
    'approvalCode': src.approvalCode,
    'responseCode': src.responseCode,
    'rrn': src.rrn,
    'statusCode': src.statusCode
  };
  return dest;
}
