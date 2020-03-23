import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

export interface Action {
  authority: string;
  checked: boolean;
}

export interface MessageAction {
  notify: Action;
}

export interface MessageModel {
  terminalId: string;
  text: string;
  notifyAction: any;
}

export function dtoToMessage(src: any) {
  const terminalNotify: MessageAction = newMessageAction(src.terminalId);

  const dest: any = {
    'terminalId': src.terminalId,
    'text': '',
    'notifyAction': {
      'terminalNotify': addTerminalMessage(terminalNotify),
    }
  };
  return dest;
}

export function messageToUpdate(src: MessageModel) {
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

function newMessageAction(notifyAuthority: string) {
  const dest = {
    'notify': { 'authority': notifyAuthority, 'checked': false }
  };
  return dest;
}

const formBuilder: FormBuilder = new FormBuilder();

function addTerminalMessage(messageAction: MessageAction) {
  return new FormArray([
    formBuilder.group({'messageName': 'Notify', 'authority': messageAction.notify.authority, 'checked': new FormControl(messageAction.notify.checked)})
  ]);
}

// function getGroupGrant(groupGrant: any, dest: any) {
//   const groupGrantValue: any = groupGrant.value
//   for (let i = 0; i < groupGrantValue.length; i++) {
//     if (groupGrantValue[i].checked) dest.push(groupGrantValue[i].authority)
//   }
// }
