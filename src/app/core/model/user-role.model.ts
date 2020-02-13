import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */

interface RoleAuthority {
  authority: any;
}

interface Grant {
  view: any;
  edit: any;
  create: any;
}

interface UserRoleModel {
  roleCode: any;
  description: any;
  roleAuthorities: any;
  groupGrants: any;
}

export function dtoToUserRole(src: any) {
  const roleAuthorities: any = [];

  const paymentSystems: Grant = newGroupGrant();
  const systemKeys: Grant = newGroupGrant();
  const paymentSystemKeys: Grant = newGroupGrant();
  const generalSettings: Grant = newGroupGrant();
  const attestationParameters: Grant = newGroupGrant();
  const merchant: Grant = newGroupGrant();
  const terminal: Grant = newGroupGrant();
  const terminalGroups: Grant = newGroupGrant();
  const products: Grant = newGroupGrant();
  const receiptTemplate: Grant = newGroupGrant();
  const terminalKeys: Grant = newGroupGrant();
  const schedule: Grant = newGroupGrant();
  const transactions: Grant = newGroupGrant();
  const applicationLanguages: Grant = newGroupGrant();
  const attestationHistory: Grant = newGroupGrant();
  const receiptRequests: Grant = newGroupGrant();
  const analytics: Grant = newGroupGrant();
  const monitoring: Grant = newGroupGrant();
  const createUser: Grant = newGroupGrant();

  for (let i = 0; i < src.roleAuthorities.length; i++) {
    const authority = src.roleAuthorities[i].authority
    console.log(authority);
    roleAuthorities.push(authority);

    if (authority === 'PAYMENT_SYSTEMS_VIEW') paymentSystems.view = true
    if (authority === 'PAYMENT_SYSTEMS_UPDATE') paymentSystems.edit = true
    if (authority === 'PAYMENT_SYSTEMS_CREATE') paymentSystems.create = true
    if (authority === 'SYSTEM_KEYS_VIEW') systemKeys.view = true
    if (authority === 'SYSTEM_KEYS_UPDATE') systemKeys.edit = true
    if (authority === 'SYSTEM_KEYS_CREATE') systemKeys.create = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_VIEW') paymentSystemKeys.view = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_UPDATE') paymentSystemKeys.edit = true
    if (authority === 'PAYMENT_SYSTEM_KEYS_CREATE') paymentSystemKeys.create = true
    if (authority === 'GENERAL_SETTINGS_VIEW') generalSettings.view = true
    if (authority === 'GENERAL_SETTINGS_UPDATE') generalSettings.edit = true
    if (authority === 'GENERAL_SETTINGS_CREATE') generalSettings.create = true
    if (authority === 'ATTESTATION_PARAMETERS_VIEW') attestationParameters.view = true
    if (authority === 'ATTESTATION_PARAMETERS_UPDATE') attestationParameters.edit = true
    if (authority === 'ATTESTATION_PARAMETERS_CREATE') attestationParameters.create = true
    if (authority === 'MERCHANT_VIEW') merchant.view = true
    if (authority === 'MERCHANT_UPDATE') merchant.edit = true
    if (authority === 'MERCHANT_CREATE') merchant.create = true
    if (authority === 'TERMINAL_VIEW') terminal.view = true
    if (authority === 'TERMINAL_UPDATE') terminal.edit = true
    if (authority === 'TERMINAL_CREATE') terminal.create = true
    if (authority === 'TERMINAL_GROUPS_VIEW') terminalGroups.view = true
    if (authority === 'TERMINAL_GROUPS_UPDATE') terminalGroups.edit = true
    if (authority === 'TERMINAL_GROUPS_CREATE') terminalGroups.create = true
    if (authority === 'PRODUCTS_VIEW') products.view = true
    if (authority === 'PRODUCTS_UPDATE') products.edit = true
    if (authority === 'PRODUCTS_CREATE') products.create = true
    if (authority === 'RECEIPT_TEMPLATE_VIEW') receiptTemplate.view = true
    if (authority === 'RECEIPT_TEMPLATE_UPDATE') receiptTemplate.edit = true
    if (authority === 'RECEIPT_TEMPLATE_CREATE') receiptTemplate.create = true
    if (authority === 'TERMINAL_KEYS_VIEW') terminalKeys.view = true
    if (authority === 'TERMINAL_KEYS_UPDATE') terminalKeys.edit = true
    if (authority === 'TERMINAL_KEYS_UPDATE') terminalKeys.create = true
    if (authority === 'SCHEDULE_VIEW') schedule.view = true
    if (authority === 'SCHEDULE_UPDATE') schedule.edit = true
    if (authority === 'SCHEDULE_CREATE') schedule.create = true
    if (authority === 'TRANSACTIONS_VIEW') transactions.view = true
    if (authority === 'TRANSACTIONS_UPDATE') transactions.edit = true
    if (authority === 'TRANSACTIONS_CREATE') transactions.create = true
    if (authority === 'APPLICATION_LANGUAGES_VIEW') applicationLanguages.view = true
    if (authority === 'APPLICATION_LANGUAGES_UPDATE') applicationLanguages.edit = true
    if (authority === 'APPLICATION_LANGUAGES_CREATE') applicationLanguages.create = true
    if (authority === 'ATTESTATION_HISTORY_VIEW') attestationHistory.view = true
    if (authority === 'ATTESTATION_HISTORY_UPDATE') attestationHistory.edit = true
    if (authority === 'ATTESTATION_HISTORY_CREATE') attestationHistory.create = true
    if (authority === 'RECEIPT_REQUESTS_VIEW') receiptRequests.view = true
    if (authority === 'RECEIPT_REQUESTS_UPDATE') receiptRequests.edit = true
    if (authority === 'RECEIPT_REQUESTS_CREATE') receiptRequests.create = true
    if (authority === 'ANALYTICS_VIEW') analytics.view = true
    if (authority === 'ANALYTICS_UPDATE') analytics.edit = true
    if (authority === 'ANALYTICS_CREATE') analytics.create = true
    if (authority === 'MONITORING_VIEW') monitoring.view = true
    if (authority === 'MONITORING_UPDATE') monitoring.edit = true
    if (authority === 'MONITORING_CREATE') monitoring.create = true
    if (authority === 'USER_VIEW') createUser.view = true
    if (authority === 'USER_UPDATE') createUser.edit = true
    if (authority === 'USER_CREATE') createUser.create = true
  }

  const dest: any = {
    'roleCode': src.roleCode,
    'description': src.description,
    'roleAuthorities': roleAuthorities,
    'groupGrants': {
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
    }
  };
  return dest;
}

export function userRoleToUpdate(src: any) {
  const dest = {
    'userAuthorityList': src.roleAuthorities
  };
  return dest;
}

function newGroupGrant() {
  const dest = {
    'view': false,
    'edit': false,
    'create': false
  };
  return dest;
}

const formBuilder: FormBuilder = new FormBuilder();

function addGroupGrant(grant: Grant) {
  return new FormArray([
    formBuilder.group({'name':'View', 'val': new FormControl(grant.view)}),
    formBuilder.group({'name':'Edit', 'val': new FormControl(grant.edit)}),
    formBuilder.group({'name':'Create', 'val': new FormControl(grant.create)})
  ]);
}
