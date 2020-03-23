import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

export interface Grant {
  authority: string;
  checked: boolean;
}

export interface GroupGrant {
  view: Grant;
  edit: Grant;
  create: Grant;
}


export interface MessageGrant {
  notify: Grant;
}

export interface UserRoleModel {
  roleCode: string;
  description: string;
  roleAuthorities: any;
}

export function dtoToMessage(src: any) {
  const terminalNotify: MessageGrant = newMessageGrant(src.terminalId);

  const dest: any = {
    'terminalId': src.terminalId,
    'description': '',
    'roleAuthorities': {
      'terminalNotify': addTerminalMessage(terminalNotify),
    }
  };
  return dest;
}

export function dtoToUserRole(src: any) {
  const paymentSystems: GroupGrant = newGroupGrant('PAYMENT_SYSTEMS_VIEW', 'PAYMENT_SYSTEMS_UPDATE', 'PAYMENT_SYSTEMS_CREATE');
  const systemKeys: GroupGrant = newGroupGrant('SYSTEM_KEYS_VIEW', 'SYSTEM_KEYS_UPDATE', 'SYSTEM_KEYS_CREATE');
  const paymentSystemKeys: GroupGrant = newGroupGrant('PAYMENT_SYSTEM_KEYS_VIEW', 'PAYMENT_SYSTEM_KEYS_UPDATE', 'PAYMENT_SYSTEM_KEYS_CREATE');
  const generalSettings: GroupGrant = newGroupGrant('GENERAL_SETTINGS_VIEW', 'GENERAL_SETTINGS_UPDATE', 'GENERAL_SETTINGS_CREATE');
  const attestationParameters: GroupGrant = newGroupGrant('ATTESTATION_PARAMETERS_VIEW', 'ATTESTATION_PARAMETERS_UPDATE', 'ATTESTATION_PARAMETERS_CREATE');
  const merchant: GroupGrant = newGroupGrant('MERCHANT_VIEW', 'MERCHANT_UPDATE', 'MERCHANT_CREATE');
  const terminal: GroupGrant = newGroupGrant('TERMINAL_VIEW', 'TERMINAL_UPDATE', 'TERMINAL_CREATE');
  const terminalGroups: GroupGrant = newGroupGrant('TERMINAL_GROUPS_VIEW', 'TERMINAL_GROUPS_UPDATE', 'TERMINAL_GROUPS_CREATE');
  const products: GroupGrant = newGroupGrant('PRODUCTS_VIEW', 'PRODUCTS_UPDATE', 'PRODUCTS_CREATE');
  const receiptTemplate: GroupGrant = newGroupGrant('RECEIPT_TEMPLATE_VIEW', 'RECEIPT_TEMPLATE_UPDATE', 'RECEIPT_TEMPLATE_CREATE');
  const terminalKeys: GroupGrant = newGroupGrant('TERMINAL_KEYS_VIEW', 'TERMINAL_KEYS_UPDATE', 'TERMINAL_KEYS_CREATE');
  const schedule: GroupGrant = newGroupGrant('SCHEDULE_VIEW', 'SCHEDULE_UPDATE', 'SCHEDULE_CREATE');
  const transactions: GroupGrant = newGroupGrant('TRANSACTIONS_VIEW', 'TRANSACTIONS_UPDATE', 'TRANSACTIONS_CREATE');
  const applicationLanguages: GroupGrant = newGroupGrant('APPLICATION_LANGUAGES_VIEW', 'APPLICATION_LANGUAGES_UPDATE', 'APPLICATION_LANGUAGES_CREATE');
  const attestationHistory: GroupGrant = newGroupGrant('ATTESTATION_HISTORY_VIEW', 'ATTESTATION_HISTORY_UPDATE', 'ATTESTATION_HISTORY_CREATE');
  const receiptRequests: GroupGrant = newGroupGrant('RECEIPT_REQUESTS_VIEW', 'RECEIPT_REQUESTS_UPDATE', 'RECEIPT_REQUESTS_CREATE');
  const analytics: GroupGrant = newGroupGrant('ANALYTICS_VIEW', 'ANALYTICS_UPDATE', 'ANALYTICS_CREATE');
  const monitoring: GroupGrant = newGroupGrant('MONITORING_VIEW', 'MONITORING_UPDATE', 'MONITORING_CREATE');
  const createUser: GroupGrant = newGroupGrant('USER_VIEW', 'USER_UPDATE', 'USER_CREATE');
  const bank: GroupGrant = newGroupGrant('BANK_VIEW', 'BANK_UPDATE', 'BANK_CREATE');
  const registration: GroupGrant = newGroupGrant('REGISTRATION_VIEW', 'REGISTRATION_UPDATE', 'REGISTRATION_CREATE');
  const userRole: GroupGrant = newGroupGrant('ROLE_VIEW', 'ROLE_UPDATE', 'ROLE_CREATE');

  for (let i = 0; i < src.roleAuthorities.length; i++) {
    const authority = src.roleAuthorities[i].authority
    if (authority === 'PAYMENT_SYSTEMS_VIEW') paymentSystems.view.checked = true
    if (authority === 'PAYMENT_SYSTEMS_UPDATE') paymentSystems.edit.checked = true
    if (authority === 'PAYMENT_SYSTEMS_CREATE') paymentSystems.create.checked = true
    if (authority === 'SYSTEM_KEYS_VIEW') systemKeys.view.checked = true
    if (authority === 'SYSTEM_KEYS_UPDATE') systemKeys.edit.checked = true
    if (authority === 'SYSTEM_KEYS_CREATE') systemKeys.create.checked = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_VIEW') paymentSystemKeys.view.checked = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_UPDATE') paymentSystemKeys.edit.checked = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_CREATE') paymentSystemKeys.create.checked = true
    if (authority === 'GENERAL_SETTINGS_VIEW') generalSettings.view.checked = true
    if (authority === 'GENERAL_SETTINGS_UPDATE') generalSettings.edit.checked = true
    if (authority === 'GENERAL_SETTINGS_CREATE') generalSettings.create.checked = true
    if (authority === 'ATTESTATION_PARAMETERS_VIEW') attestationParameters.view.checked = true
    if (authority === 'ATTESTATION_PARAMETERS_UPDATE') attestationParameters.edit.checked = true
    if (authority === 'ATTESTATION_PARAMETERS_CREATE') attestationParameters.create.checked = true
    if (authority === 'MERCHANT_VIEW') merchant.view.checked = true
    if (authority === 'MERCHANT_UPDATE') merchant.edit.checked = true
    if (authority === 'MERCHANT_CREATE') merchant.create.checked = true
    if (authority === 'TERMINAL_VIEW') terminal.view.checked = true
    if (authority === 'TERMINAL_UPDATE') terminal.edit.checked = true
    if (authority === 'TERMINAL_CREATE') terminal.create.checked = true
    if (authority === 'TERMINAL_GROUPS_VIEW') terminalGroups.view.checked = true
    if (authority === 'TERMINAL_GROUPS_UPDATE') terminalGroups.edit.checked = true
    if (authority === 'TERMINAL_GROUPS_CREATE') terminalGroups.create.checked = true
    if (authority === 'PRODUCTS_VIEW') products.view.checked = true
    if (authority === 'PRODUCTS_UPDATE') products.edit.checked = true
    if (authority === 'PRODUCTS_CREATE') products.create.checked = true
    if (authority === 'RECEIPT_TEMPLATE_VIEW') receiptTemplate.view.checked = true
    if (authority === 'RECEIPT_TEMPLATE_UPDATE') receiptTemplate.edit.checked = true
    if (authority === 'RECEIPT_TEMPLATE_CREATE') receiptTemplate.create.checked = true
    if (authority === 'TERMINAL_KEYS_VIEW') terminalKeys.view.checked = true
    if (authority === 'TERMINAL_KEYS_UPDATE') terminalKeys.edit.checked = true
    if (authority === 'TERMINAL_KEYS_CREATE') terminalKeys.create.checked = true
    if (authority === 'SCHEDULE_VIEW') schedule.view.checked = true
    if (authority === 'SCHEDULE_UPDATE') schedule.edit.checked = true
    if (authority === 'SCHEDULE_CREATE') schedule.create.checked = true
    if (authority === 'TRANSACTIONS_VIEW') transactions.view.checked = true
    if (authority === 'TRANSACTIONS_UPDATE') transactions.edit.checked = true
    if (authority === 'TRANSACTIONS_CREATE') transactions.create.checked = true
    if (authority === 'APPLICATION_LANGUAGES_VIEW') applicationLanguages.view.checked = true
    if (authority === 'APPLICATION_LANGUAGES_UPDATE') applicationLanguages.edit.checked = true
    if (authority === 'APPLICATION_LANGUAGES_CREATE') applicationLanguages.create.checked = true
    if (authority === 'ATTESTATION_HISTORY_VIEW') attestationHistory.view.checked = true
    if (authority === 'ATTESTATION_HISTORY_UPDATE') attestationHistory.edit.checked = true
    if (authority === 'ATTESTATION_HISTORY_CREATE') attestationHistory.create.checked = true
    if (authority === 'RECEIPT_REQUESTS_VIEW') receiptRequests.view.checked = true
    if (authority === 'RECEIPT_REQUESTS_UPDATE') receiptRequests.edit.checked = true
    if (authority === 'RECEIPT_REQUESTS_CREATE') receiptRequests.create.checked = true
    if (authority === 'ANALYTICS_VIEW') analytics.view.checked = true
    if (authority === 'ANALYTICS_UPDATE') analytics.edit.checked = true
    if (authority === 'ANALYTICS_CREATE') analytics.create.checked = true
    if (authority === 'MONITORING_VIEW') monitoring.view.checked = true
    if (authority === 'MONITORING_UPDATE') monitoring.edit.checked = true
    if (authority === 'MONITORING_CREATE') monitoring.create.checked = true
    if (authority === 'USER_VIEW') createUser.view.checked = true
    if (authority === 'USER_UPDATE') createUser.edit.checked = true
    if (authority === 'USER_CREATE') createUser.create.checked = true
    if (authority === 'BANK_VIEW') bank.view.checked = true
    if (authority === 'BANK_UPDATE') bank.edit.checked = true
    if (authority === 'BANK_CREATE') bank.create.checked = true
    if (authority === 'REGISTRATION_VIEW') registration.view.checked = true
    if (authority === 'REGISTRATION_UPDATE') registration.edit.checked = true
    if (authority === 'REGISTRATION_CREATE') registration.create.checked = true
    if (authority === 'ROLE_VIEW') userRole.view.checked = true
    if (authority === 'ROLE_UPDATE') userRole.edit.checked = true
    if (authority === 'ROLE_CREATE') userRole.create.checked = true
  }

  const dest: any = {
    'roleCode': src.roleCode,
    'description': src.description,
    'roleAuthorities': {
      'paymentSystems': addGroupGrant(paymentSystems),
      'systemKeys': addGroupGrant(systemKeys),
      'paymentSystemKeys': addGroupGrant(paymentSystemKeys),
      'generalSettings': addGroupGrant(generalSettings),
      'attestationParameters': addGroupGrant(attestationParameters),
      'merchant': addGroupGrant(merchant),
      'terminal': addGroupGrant(terminal),
      'terminalGroups': addGroupGrant(terminalGroups),
      'products': addGroupGrant(products),
      'receiptTemplate': addGroupGrant(receiptTemplate),
      'terminalKeys': addGroupGrant(terminalKeys),
      'schedule': addGroupGrant(schedule),
      'transactions': addGroupGrant(transactions),
      'applicationLanguages': addGroupGrant(applicationLanguages),
      'attestationHistory': addGroupGrant(attestationHistory),
      'receiptRequests': addGroupGrant(receiptRequests),
      'analytics': addGroupGrant(analytics),
      'monitoring': addGroupGrant(monitoring),
      'createUser': addGroupGrant(createUser),
      'bank': addGroupGrant(bank),
      'registration': addGroupGrant(registration),
      'userRole': addGroupGrant(userRole),
    }
  };
  return dest;
}

export function userRoleToUpdate(src: UserRoleModel) {
  const userAuthorityList = [];
  getGroupGrant(src.roleAuthorities['paymentSystems'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['systemKeys'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['paymentSystemKeys'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['generalSettings'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['attestationParameters'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['merchant'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['terminal'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['terminalGroups'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['products'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['receiptTemplate'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['terminalKeys'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['schedule'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['transactions'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['applicationLanguages'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['attestationHistory'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['receiptRequests'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['analytics'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['monitoring'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['createUser'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['bank'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['registration'], userAuthorityList)
  getGroupGrant(src.roleAuthorities['userRole'], userAuthorityList)

  const dest = {
    'description': src.description,
    'userAuthorityList': userAuthorityList
  };
  return dest;
}

function newGroupGrant(viewAuthority: string, editAuthority: string, createAuthority: string) {
  const dest = {
    'view': { 'authority': viewAuthority, 'checked': false },
    'edit': { 'authority': editAuthority, 'checked': false },
    'create': { 'authority': createAuthority, 'checked': false }
  };
  return dest;
}

function newMessageGrant(notifyAuthority: string) {
  const dest = {
    'notify': { 'authority': notifyAuthority, 'checked': false }
  };
  return dest;
}

const formBuilder: FormBuilder = new FormBuilder();

function addGroupGrant(groupGrant: GroupGrant) {
  return new FormArray([
    formBuilder.group({'grantName': 'View', 'authority': groupGrant.view.authority, 'checked': new FormControl(groupGrant.view.checked)}),
    formBuilder.group({'grantName': 'Edit', 'authority': groupGrant.edit.authority, 'checked': new FormControl(groupGrant.edit.checked)}),
    formBuilder.group({'grantName': 'Create', 'authority': groupGrant.create.authority, 'checked': new FormControl(groupGrant.create.checked)})
  ]);
}

function addTerminalMessage(messageGrant: MessageGrant) {
  return new FormArray([
    formBuilder.group({'grantName': 'Notify', 'authority': messageGrant.notify.authority, 'checked': new FormControl(messageGrant.notify.checked)})
  ]);
}

function getGroupGrant(groupGrant: any, dest: any) {
  const groupGrantValue: any = groupGrant.value
  for (let i = 0; i < groupGrantValue.length; i++) {
    if (groupGrantValue[i].checked) dest.push(groupGrantValue[i].authority)
  }
}
