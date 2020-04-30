import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export interface MessageModel {
  text: any;
  merchantIds: any;
  terminalIds: any;
}

export interface Action {
  message: string;
  checked: boolean;
}

export interface MessageAction {
  notify: Action;
}

export function dtoToTerminalMessage(src: any) {
  const terminalMessage: MessageAction = newMessageAction(src.terminalId);

  const dest: any = {
    'merchantId': src.merchantId,
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

export function messageToUpdate(src: any) {
  const dest = {
    'text': src.text,
    'merchantIdList': src.merchantIds,
    'terminalIdList': src.terminalIds
  };
  return dest;
}

export function disableUpdateOnSubmitMessage(entity: any) {
  const dto = messageToUpdate(entity);
  const disabled = (isNotEmpty(dto.text) && (0 < dto.merchantIdList.length || 0 < dto.terminalIdList.length)) ? true : false
  return {disabled : disabled};
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

export function messageNew() {
  const dest = {
    'text': null,
    'merchantIds': [],
    'terminalIds': []
  };
  return dest;
}

export function isNotEmpty(val) {
  return !isEmpty(val);
}

export function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
