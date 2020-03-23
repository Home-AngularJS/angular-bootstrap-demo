import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

export interface Grant {
  authority: string;
  checked: boolean;
}

export interface MessageGrant {
  notify: Grant;
}

export interface MessageModel {
  terminalId: string;
  text: string;
  roleAuthorities: any;
}

export function dtoToMessage(src: any) {
  const terminalNotify: MessageGrant = newMessageGrant(src.terminalId);

  const dest: any = {
    'terminalId': src.terminalId,
    'text': '',
    'roleAuthorities': {
      'terminalNotify': addTerminalMessage(terminalNotify),
    }
  };
  return dest;
}

export function messageToUpdate(src: MessageModel) {
//   const userAuthorityList = [];
//   getGroupGrant(src.roleAuthorities['paymentSystems'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['systemKeys'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['paymentSystemKeys'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['generalSettings'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['attestationParameters'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['merchant'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['terminal'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['terminalGroups'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['products'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['receiptTemplate'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['terminalKeys'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['schedule'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['transactions'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['applicationLanguages'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['attestationHistory'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['receiptRequests'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['analytics'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['monitoring'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['createUser'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['bank'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['registration'], userAuthorityList)
//   getGroupGrant(src.roleAuthorities['userRole'], userAuthorityList)
//
//   const dest = {
//     'text': src.text,
//     'userAuthorityList': userAuthorityList
//   };
//   return dest;
}

function newMessageGrant(notifyAuthority: string) {
  const dest = {
    'notify': { 'authority': notifyAuthority, 'checked': false }
  };
  return dest;
}

const formBuilder: FormBuilder = new FormBuilder();

function addTerminalMessage(messageGrant: MessageGrant) {
  return new FormArray([
    formBuilder.group({'grantName': 'Notify', 'authority': messageGrant.notify.authority, 'checked': new FormControl(messageGrant.notify.checked)})
  ]);
}

// function getGroupGrant(groupGrant: any, dest: any) {
//   const groupGrantValue: any = groupGrant.value
//   for (let i = 0; i < groupGrantValue.length; i++) {
//     if (groupGrantValue[i].checked) dest.push(groupGrantValue[i].authority)
//   }
// }
