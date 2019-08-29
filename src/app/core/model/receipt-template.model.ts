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
  transactionTime: any;
}


export function dtoToReceiptTemplate(src: any) {
  // const transactionDate = new Date(); // src.transactionDate;

  const dest: any = {
    'id': src.id,
    'ticketName': src.ticketName,
    'template': src.template,
    'nameBank': src.nameBank.value,
    'mName': src.mName.value,
    'mLocation': src.mLocation.value,
    'termId': src.termId.value,
    'merchId': src.merchId.value,
    'recNum': src.recNum.value,
    'typeOperation': src.typeOperation.value,
    'typeOperationTextSuccess': src.typeOperationTextSuccess.value,
    'typeOperationTextNotsuccess': src.typeOperationTextNotsuccess.value,
    'amount': src.amount.value,
    'ips': src.ips.value,
    'panMaska': src.panMaska.value,
    'expDate': src.expDate.value,
    'respCode': src.respCode.value,
    'respCodeTextPayment': src.respCodeTextPayment.value,
    'respCodeTextReturn': src.respCodeTextReturn.value,
    'authCode': src.authCode.value,
    'rrn': src.rrn.value,
    'seqNum': src.seqNum.value,
    'transactionDate': src.transactionDate.value,
    'transactionTime': src.transactionTime.value
  };
  return dest;
}

export function receiptTemplateToDto(src: any) {
  const transactionDate = new Date(); // src.transactionDate;
  const transactionTime = new Date(); // src.transactionTime;
  // var transactionDate = src.transactionDate;
  // transactionDate.value = new Date();
  // var transactionTime = src.transactionTime;
  // transactionTime.value = new Date();

  const dest = receiptTemplateNew()
  dest.id = src.id
  dest.ticketName = src.ticketName
  dest.template = src.template
  dest.nameBank.value = src.nameBank
  dest.mName.value = src.mName
  dest.mLocation.value = src.mLocation
  dest.termId.value = src.termId
  dest.merchId.value = src.merchId
  dest.recNum.value = src.recNum
  dest.typeOperation.value = src.typeOperation
  dest.typeOperationTextSuccess.value = src.typeOperationTextSuccess
  dest.typeOperationTextNotsuccess.value = src.typeOperationTextNotsuccess
  dest.amount.value = src.amount
  dest.ips.value = src.ips
  dest.panMaska.value = src.panMaska
  dest.expDate.value = src.expDate
  dest.respCode.value = src.respCode
  dest.respCodeTextPayment.value = src.respCodeTextPayment
  dest.respCodeTextReturn.value = src.respCodeTextReturn
  dest.authCode.value = src.authCode
  dest.rrn.value = src.rrn
  dest.seqNum.value = src.seqNum
  dest.transactionDate.value = transactionDate
  dest.transactionTime.value = transactionTime
  return dest;
}

export function receiptTemplateNew() {
  const dest = {
    'id': null,
    'ticketName': null,
    'template': null,
    'nameBank': {'key': '__NAME_BANK__', 'value': null},
    'mName': {'key': '__M_NAME__', 'value': null},
    'mLocation': {'key': '__M_LOCATION__', 'value': null},
    'termId': {'key': '__TERM_ID__', 'value': null},
    'merchId': {'key': '__MERCH_ID__', 'value': null},
    'recNum': {'key': '__REC_NUM__', 'value': null},
    'typeOperation': {'key': '__TYPE_OPERATION__', 'value': null},
    'typeOperationTextSuccess': {'key': '__TYPE_OPERATION_TEXT__', 'value': null},
    'typeOperationTextNotsuccess': {'key': '__TYPE_OPERATION_TEXT__', 'value': null},
    'amount': {'key': '__AMOUNT__', 'value': null},
    'ips': {'key': '__IPS__', 'value': null},
    'panMaska': {'key': '__PAN_MASKA__', 'value': null},
    'expDate': {'key': '__EXP_DATE__', 'value': null},
    'respCode': {'key': '__RESP_CODE__', 'value': null},
    'respCodeTextPayment': {'key': '__RESP_CODE_TEXT__', 'value': null},
    'respCodeTextReturn': {'key': '__RESP_CODE_TEXT__', 'value': null},
    'authCode': {'key': '__AUTH_CODE__', 'value': null},
    'rrn': {'key': '__RRN__', 'value': null},
    'seqNum': {'key': '__SEG_NUM__', 'value': null},
    'transactionDate': {'key': '__TRANSACTION_DATE__', 'value': null},
    'transactionTime': {'key': '__TRANSACTION_TIME__', 'value': null}
  };
  return dest;
}
