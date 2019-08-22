/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
interface TicketTemplateModel {
  id: any;
  ticketName: any;
  template: any;
  mName: any;
  mLocation: any;
  termId: any;
  merchId: any;
  recNum: any;
  amount: any;
  panSale: any;
  panMaska: any;
  expDate: any;
  respCode: any;
  authCode: any;
  rrn: any;
  seqNum: any;
  clientName: any;
}


export function dtoToTicketTemplate(src: any) {
  const dest: any = {
    'id': src.id,
    'ticketName': src.ticketName,
    'template': src.template,
    'mName': src.mName,
    'mLocation': src.mLocation,
    'termId': src.termId,
    'merchId': src.merchId,
    'recNum': src.recNum,
    'amount': src.amount,
    'panSale': src.panSale,
    'panMaska': src.panMaska,
    'expDate': src.expDate,
    'respCode': src.respCode,
    'authCode': src.authCode,
    'rrn': src.rrn,
    'seqNum': src.seqNum,
    'clientName': src.clientName
  };
  return dest;
}

export function ticketTemplateToDto(src: any) {
  const dest = {
    'id': src.id,
    'ticketName': src.ticketName,
    'template': src.template,
    'mName': src.mName,
    'mLocation': src.mLocation,
    'termId': src.termId,
    'merchId': src.merchId,
    'recNum': src.recNum,
    'amount': src.amount,
    'panSale': src.panSale,
    'panMaska': src.panMaska,
    'expDate': src.expDate,
    'respCode': src.respCode,
    'authCode': src.authCode,
    'rrn': src.rrn,
    'seqNum': src.seqNum,
    'clientName': src.clientName
  };
  return dest;
}

export function ticketTemplateNew() {
  const dest = {
    'id': null,
    'ticketName': null,
    'template': null,
    'mName': null,
    'mLocation': null,
    'termId': null,
    'merchId': null,
    'recNum': null,
    'amount': null,
    'panSale': null,
    'panMaska': null,
    'expDate': null,
    'respCode': null,
    'authCode': null,
    'rrn': null,
    'seqNum': null,
    'clientName': null
  };
  return dest;
}
