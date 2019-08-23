/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ReceiptTemplateModel {
  id: any;
  ticketName: any;
  template: any;
  nameBank: any;
  mName: any;
  mLocation: any;
  termId: any;
  merchId: any;
  recNum: any;
  typeOperation: any;
  typeOperationTextSuccess: any;
  typeOperationTextNotsuccess: any;
  amount: any;
  ips: any;
  panMaska: any;
  expDate: any;
  respCode: any;
  respCodeTextPayment: any;
  respCodeTextReturn: any;
  authCode: any;
  rrn: any;
  seqNum: any;
  transactionDate: any;
}


export function dtoToReceiptTemplate(src: any) {
  const transactionDate = new Date(); // src.transactionDate;

  const dest: any = {
    'id': src.id,
    'ticketName': src.ticketName,
    'template': src.template,
    'nameBank': src.nameBank,
    'mName': src.mName,
    'mLocation': src.mLocation,
    'termId': src.termId,
    'merchId': src.merchId,
    'recNum': src.recNum,
    'typeOperation': src.typeOperation,
    'typeOperationTextSuccess': src.typeOperationTextSuccess,
    'typeOperationTextNotsuccess': src.typeOperationTextNotsuccess,
    'amount': src.amount,
    'ips': src.ips,
    'panMaska': src.panMaska,
    'expDate': src.expDate,
    'respCode': src.respCode,
    'respCodeTextPayment': src.respCodeTextPayment,
    'respCodeTextReturn': src.respCodeTextReturn,
    'authCode': src.authCode,
    'rrn': src.rrn,
    'seqNum': src.seqNum,
    'transactionDate': transactionDate
  };
  return dest;
}

export function receiptTemplateToDto(src: any) {
  const transactionDate = new Date(); // src.transactionDate;

  const dest = {
    'id': src.id,
    'ticketName': src.ticketName,
    'template': src.template,
    'nameBank': src.nameBank,
    'mName': src.mName,
    'mLocation': src.mLocation,
    'termId': src.termId,
    'merchId': src.merchId,
    'recNum': src.recNum,
    'typeOperation': src.typeOperation,
    'typeOperationTextSuccess': src.typeOperationTextSuccess,
    'typeOperationTextNotsuccess': src.typeOperationTextNotsuccess,
    'amount': src.amount,
    'ips': src.ips,
    'panMaska': src.panMaska,
    'expDate': src.expDate,
    'respCode': src.respCode,
    'respCodeTextPayment': src.respCodeTextPayment,
    'respCodeTextReturn': src.respCodeTextReturn,
    'authCode': src.authCode,
    'rrn': src.rrn,
    'seqNum': src.seqNum,
    'transactionDate': transactionDate
  };
  return dest;
}

export function receiptTemplateNew() {
  const dest = {
    'id': null,
    'ticketName': null,
    'template': null,
    'nameBank': null,
    'mName': null,
    'mLocation': null,
    'termId': null,
    'merchId': null,
    'recNum': null,
    'typeOperation': null,
    'typeOperationTextSuccess': null,
    'typeOperationTextNotsuccess': null,
    'amount': null,
    'ips': null,
    'panMaska': null,
    'expDate': null,
    'respCode': null,
    'respCodeTextPayment': null,
    'respCodeTextReturn': null,
    'authCode': null,
    'rrn': null,
    'seqNum': null,
    'transactionDate': null
  };
  return dest;
}
