import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface MessageModel {
  text: any;
  terminalIdList: any;
}

export interface Action {
  message: string;
  checked: boolean;
}

export interface MessageAction {
  notify: Action;
}

export interface MessageItemModel {
  terminalId: string;
  text: string;
  notifyAction: any;
}

export function dtoToTerminalMessage(src: any) {
  const terminalMessage: MessageAction = newMessageAction(src.terminalId);

  const dest: any = {
    'terminalId': src.terminalId,
    'text': '',
    'notifyAction': {
      'terminalMessage': addMessageAction(terminalMessage),
    }
  };
  return dest;
}

export function dtoToMerchantMessage(src: any) {
  const merchantMessage: MessageAction = newMessageAction(src.merchantId);

  const dest: any = {
    'merchantId': src.merchantId,
    'text': '',
    'notifyAction': {
      'merchantMessage': addMessageAction(merchantMessage),
    }
  };
  return dest;
}

export function messageItemToUpdate(src: MessageItemModel) {
//   const userAuthorityList = [];
//   getGroupGrant(src.notifyAction['paymentSystems'], userAuthorityList)
//   getGroupGrant(src.notifyAction['systemKeys'], userAuthorityList)
//   getGroupGrant(src.notifyAction['paymentSystemKeys'], userAuthorityList)
//   getGroupGrant(src.notifyAction['generalSettings'], userAuthorityList)
//   getGroupGrant(src.notifyAction['attestationParameters'], userAuthorityList)
//   getGroupGrant(src.notifyAction['merchant'], userAuthorityList)
//   getGroupGrant(src.notifyAction['terminal'], userAuthorityList)
//   getGroupGrant(src.notifyAction['terminalGroups'], userAuthorityList)
//   getGroupGrant(src.notifyAction['products'], userAuthorityList)
//   getGroupGrant(src.notifyAction['receiptTemplate'], userAuthorityList)
//   getGroupGrant(src.notifyAction['terminalKeys'], userAuthorityList)
//   getGroupGrant(src.notifyAction['schedule'], userAuthorityList)
//   getGroupGrant(src.notifyAction['transactions'], userAuthorityList)
//   getGroupGrant(src.notifyAction['applicationLanguages'], userAuthorityList)
//   getGroupGrant(src.notifyAction['attestationHistory'], userAuthorityList)
//   getGroupGrant(src.notifyAction['receiptRequests'], userAuthorityList)
//   getGroupGrant(src.notifyAction['analytics'], userAuthorityList)
//   getGroupGrant(src.notifyAction['monitoring'], userAuthorityList)
//   getGroupGrant(src.notifyAction['createUser'], userAuthorityList)
//   getGroupGrant(src.notifyAction['bank'], userAuthorityList)
//   getGroupGrant(src.notifyAction['registration'], userAuthorityList)
//   getGroupGrant(src.notifyAction['userRole'], userAuthorityList)
//
//   const dest = {
//     'text': src.text,
//     'userAuthorityList': userAuthorityList
//   };
//   return dest;
}

function newMessageAction(notifyMessage: string) {
  const dest = {
    'notify': { 'message': notifyMessage, 'checked': false }
  };
  return dest;
}

const formBuilder: FormBuilder = new FormBuilder();

function addMessageAction(messageAction: MessageAction) {
  return new FormArray([
    formBuilder.group({'messageName': 'Notify', 'message': messageAction.notify.message, 'checked': new FormControl(messageAction.notify.checked)})
  ]);
}

// function getGroupGrant(groupGrant: any, dest: any) {
//   const groupGrantValue: any = groupGrant.value
//   for (let i = 0; i < groupGrantValue.length; i++) {
//     if (groupGrantValue[i].checked) dest.push(groupGrantValue[i].message)
//   }
// }

export function messageToUpdate(src: any) {
  const dest = {
    'text': src.text,
    'terminalIdList': src.terminalIds
  };
  return dest;
}

export function messageNew() {
  const dest = {
    'text': null,
    'terminalIdList': null
  };
  return dest;
}
