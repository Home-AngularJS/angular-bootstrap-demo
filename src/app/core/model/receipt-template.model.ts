/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface ReceiptTemplateModel {
  id: any;
  templateName: any;
  templateStyle: any;
  templateBody: any;
  nameBank: any;
  mName: any;
  mLocation: any;
  termId: any;
  merchId: any;
  recNum: any;
  typeOperation: any;
  typeOperationPayTxt: any;
  typeOperationRefundTxt: any;
  amount: any;
  ips: any;
  panMaska: any;
  expDate: any;
  resp: any;
  respSuccessTxt: any;
  respFailureTxt: any;
  authCode: any;
  rrn: any;
  seqNum: any;
  transactionDate: any;
  transactionDateForm: any;
  transactionTimeForm: any;
}


export function dtoToReceiptTemplate(src: any) {
  const dest: any = {
    'id': src.id,
    'templateName': src.templateName,
    'templateStyle': src.templateStyle,
    'templateBody': src.templateBody
    // 'nameBank': src.nameBank.value,
    // 'mName': src.mName.value,
    // 'mLocation': src.mLocation.value,
    // 'termId': src.termId.value,
    // 'merchId': src.merchId.value,
    // 'recNum': src.recNum.value,
    // 'typeOperation': src.typeOperation.value,
    // 'typeOperationPayTxt': src.typeOperationPayTxt.value,
    // 'typeOperationRefundTxt': src.typeOperationRefundTxt.value,
    // 'amount': src.amount.value,
    // 'ips': src.ips.value,
    // 'panMaska': src.panMaska.value,
    // 'expDate': src.expDate.value,
    // 'resp': src.resp.value,
    // 'respSuccessTxt': src.respSuccessTxt.value,
    // 'respFailureTxt': src.respFailureTxt.value,
    // 'authCode': src.authCode.value,
    // 'rrn': src.rrn.value,
    // 'seqNum': src.seqNum.value,
    // 'transactionDate': src.transactionDate.value,
    // 'transactionDateForm': src.transactionDateForm.value,
    // 'transactionTimeForm': src.transactionTimeForm.value
  };
  if (src.nameBank!=null) dest.nameBank = src.nameBank.value;
  if (src.mName!=null) dest.mName = src.mName.value;
  if (src.mLocation!=null) dest.mLocation = src.mLocation.value;
  if (src.termId!=null) dest.termId = src.termId.value;
  if (src.merchId!=null) dest.merchId = src.merchId.value;
  if (src.recNum!=null) dest.recNum = src.recNum.value;
  if (src.typeOperation!=null) dest.typeOperation = src.typeOperation.value;
  if (src.typeOperationPayTxt!=null) dest.typeOperationPayTxt = src.typeOperationPayTxt.value;
  if (src.typeOperationRefundTxt!=null) dest.typeOperationRefundTxt = src.typeOperationRefundTxt.value;
  if (src.amount!=null) dest.amount = src.amount.value;
  if (src.ips!=null) dest.ips = src.ips.value;
  if (src.panMaska!=null) dest.panMaska = src.panMaska.value;
  if (src.expDate!=null) dest.expDate = src.expDate.value;
  if (src.resp!=null) dest.resp = src.resp.value;
  if (src.respSuccessTxt!=null) dest.respSuccessTxt = src.respSuccessTxt.value;
  if (src.respFailureTxt!=null) dest.respFailureTxt = src.respFailureTxt.value;
  if (src.authCode!=null) dest.authCode = src.authCode.value;
  if (src.rrn!=null) dest.rrn = src.rrn.value;
  if (src.seqNum!=null) dest.seqNum = src.seqNum.value;
  if (src.transactionDate!=null) dest.transactionDate = src.transactionDate.value;
  if (src.transactionDateForm!=null) dest.transactionDateForm = src.transactionDateForm.value;
  if (src.transactionTimeForm!=null) dest.transactionTimeForm = src.transactionTimeForm.value;
  return dest;
}

export function receiptTemplateToDto(src: any) {
  const transactionDate = new Date(); // src.transactionDate;

  const dest = receiptTemplateNew()
  dest.id = src.id
  dest.templateName = src.templateName
  dest.templateStyle = src.templateStyle
  dest.templateBody = src.templateBody
  dest.nameBank.value = src.nameBank
  dest.mName.value = src.mName
  dest.mLocation.value = src.mLocation
  dest.termId.value = src.termId
  dest.merchId.value = src.merchId
  dest.recNum.value = src.recNum
  dest.typeOperation.value = src.typeOperation
  dest.typeOperationPayTxt.value = src.typeOperationPayTxt
  dest.typeOperationRefundTxt.value = src.typeOperationRefundTxt
  dest.amount.value = src.amount
  dest.ips.value = src.ips
  dest.panMaska.value = src.panMaska
  dest.expDate.value = src.expDate
  dest.resp.value = src.resp
  dest.respSuccessTxt.value = src.respSuccessTxt
  dest.respFailureTxt.value = src.respFailureTxt
  dest.authCode.value = src.authCode
  dest.rrn.value = src.rrn
  dest.seqNum.value = src.seqNum
  dest.transactionDate.value = transactionDate
  dest.transactionDateForm.value = src.transactionDateForm,
  dest.transactionTimeForm.value = src.transactionTimeForm
  return dest;
}

export function receiptTemplateNew() {
  const dest = {
    'id': null,
    'templateName': null,
    'templateStyle': null,
    'templateBody': null,
    'nameBank': {'key': '__NAME_BANK__', 'value': null},
    'mName': {'key': '__M_NAME__', 'value': null},
    'mLocation': {'key': '__M_LOCATION__', 'value': null},
    'termId': {'key': '__TERM_ID__', 'value': null},
    'merchId': {'key': '__MERCH_ID__', 'value': null},
    'recNum': {'key': '__REC_NUM__', 'value': null},
    'typeOperation': {'key': '__TYPE_OPERATION_CODE__', 'value': null},
    'typeOperationPayTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': null},
    'typeOperationRefundTxt': {'key': '__TYPE_OPERATION_TEXT__', 'value': null},
    'amount': {'key': '__AMOUNT__', 'value': null},
    'ips': {'key': '__IPS__', 'value': null},
    'panMaska': {'key': '__PAN_MASKA__', 'value': null},
    'expDate': {'key': '__EXP_DATE__', 'value': null},
    'resp': {'key': '__RESP_CODE__', 'value': null},
    'respSuccessTxt': {'key': '__RESP_TEXT__', 'value': null},
    'respFailureTxt': {'key': '__RESP_TEXT__', 'value': null},
    'authCode': {'key': '__AUTH_CODE__', 'value': null},
    'rrn': {'key': '__RRN__', 'value': null},
    'seqNum': {'key': '__SEG_NUM__', 'value': null},
    'transactionDate': {'key': null, 'value': null},
    'transactionDateForm': {'key': '__TRANSACTION_DATE__', 'value': null},
    'transactionTimeForm': {'key': '__TRANSACTION_TIME__', 'value': null}
  };
  return dest;
}
