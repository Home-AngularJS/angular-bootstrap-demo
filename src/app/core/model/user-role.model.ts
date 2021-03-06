import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

/**
 * @see https://youtu.be/1doIL1bPp5Q?t=448
 */
export enum UserGrant {
  ANALYTICS_CREATE = 'ANALYTICS_CREATE',
  ANALYTICS_UPDATE = 'ANALYTICS_UPDATE',
  ANALYTICS_VIEW = 'ANALYTICS_VIEW',
  APPLICATION_LANGUAGES_CREATE = 'APPLICATION_LANGUAGES_CREATE',
  APPLICATION_LANGUAGES_UPDATE = 'APPLICATION_LANGUAGES_UPDATE',
  APPLICATION_LANGUAGES_VIEW = 'APPLICATION_LANGUAGES_VIEW',
  ATTESTATION_HISTORY_CREATE = 'ATTESTATION_HISTORY_CREATE',
  ATTESTATION_HISTORY_UPDATE = 'ATTESTATION_HISTORY_UPDATE',
  ATTESTATION_HISTORY_VIEW = 'ATTESTATION_HISTORY_VIEW',
  ATTESTATION_PARAMETERS_CREATE = 'ATTESTATION_PARAMETERS_CREATE',
  ATTESTATION_PARAMETERS_UPDATE = 'ATTESTATION_PARAMETERS_UPDATE',
  ATTESTATION_PARAMETERS_VIEW = 'ATTESTATION_PARAMETERS_VIEW',
  BANK_CREATE = 'BANK_CREATE',
  BANK_UPDATE = 'BANK_UPDATE',
  BANK_VIEW = 'BANK_VIEW',
  GENERAL_SETTINGS_CREATE = 'GENERAL_SETTINGS_CREATE',
  GENERAL_SETTINGS_UPDATE = 'GENERAL_SETTINGS_UPDATE',
  GENERAL_SETTINGS_VIEW = 'GENERAL_SETTINGS_VIEW',
  MERCHANT_CREATE = 'MERCHANT_CREATE',
  MERCHANT_UPDATE = 'MERCHANT_UPDATE',
  MERCHANT_VIEW = 'MERCHANT_VIEW',
  MESSAGE_CREATE = 'MESSAGE_CREATE',
  MESSAGE_UPDATE = 'MESSAGE_UPDATE',
  MESSAGE_VIEW = 'MESSAGE_VIEW',
  MONITORING_CREATE = 'MONITORING_CREATE',
  MONITORING_UPDATE = 'MONITORING_UPDATE',
  MONITORING_VIEW = 'MONITORING_VIEW',
  PAYMENT_SYSTEMS_CREATE = 'PAYMENT_SYSTEMS_CREATE',
  PAYMENT_SYSTEMS_UPDATE = 'PAYMENT_SYSTEMS_UPDATE',
  PAYMENT_SYSTEMS_VIEW = 'PAYMENT_SYSTEMS_VIEW',
  PAYMENT_SYSTEM_KEYS_CREATE = 'PAYMENT_SYSTEM_KEYS_CREATE',
  PAYMENT_SYSTEM_KEYS_UPDATE = 'PAYMENT_SYSTEM_KEYS_UPDATE',
  PAYMENT_SYSTEM_KEYS_VIEW = 'PAYMENT_SYSTEM_KEYS_VIEW',
  PRODUCTS_CREATE = 'PRODUCTS_CREATE',
  PRODUCTS_UPDATE = 'PRODUCTS_UPDATE',
  PRODUCTS_VIEW = 'PRODUCTS_VIEW',
  RECEIPT_REQUESTS_CREATE = 'RECEIPT_REQUESTS_CREATE',
  RECEIPT_REQUESTS_UPDATE = 'RECEIPT_REQUESTS_UPDATE',
  RECEIPT_REQUESTS_VIEW = 'RECEIPT_REQUESTS_VIEW',
  RECEIPT_TEMPLATE_CREATE = 'RECEIPT_TEMPLATE_CREATE',
  RECEIPT_TEMPLATE_UPDATE = 'RECEIPT_TEMPLATE_UPDATE',
  RECEIPT_TEMPLATE_VIEW = 'RECEIPT_TEMPLATE_VIEW',
  REGISTRATION_CREATE = 'REGISTRATION_CREATE',
  REGISTRATION_UPDATE = 'REGISTRATION_UPDATE',
  REGISTRATION_VIEW = 'REGISTRATION_VIEW',
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_VIEW = 'ROLE_VIEW',
  SCHEDULE_CREATE = 'SCHEDULE_CREATE',
  SCHEDULE_UPDATE = 'SCHEDULE_UPDATE',
  SCHEDULE_VIEW = 'SCHEDULE_VIEW',
  SYSTEM_KEYS_CREATE = 'SYSTEM_KEYS_CREATE',
  SYSTEM_KEYS_UPDATE = 'SYSTEM_KEYS_UPDATE',
  SYSTEM_KEYS_VIEW = 'SYSTEM_KEYS_VIEW',
  TERMINAL_CREATE = 'TERMINAL_CREATE',
  TERMINAL_GROUPS_CREATE = 'TERMINAL_GROUPS_CREATE',
  TERMINAL_GROUPS_UPDATE = 'TERMINAL_GROUPS_UPDATE',
  TERMINAL_GROUPS_VIEW = 'TERMINAL_GROUPS_VIEW',
  TERMINAL_KEYS_CREATE = 'TERMINAL_KEYS_CREATE',
  TERMINAL_KEYS_UPDATE = 'TERMINAL_KEYS_UPDATE',
  TERMINAL_KEYS_VIEW = 'TERMINAL_KEYS_VIEW',
  TERMINAL_UPDATE = 'TERMINAL_UPDATE',
  TERMINAL_VIEW = 'TERMINAL_VIEW',
  TRANSACTIONS_CREATE = 'TRANSACTIONS_CREATE',
  TRANSACTIONS_UPDATE = 'TRANSACTIONS_UPDATE',
  TRANSACTIONS_VIEW = 'TRANSACTIONS_VIEW',
  USER_CREATE = 'USER_CREATE',
  USER_UPDATE = 'USER_UPDATE',
  USER_VIEW = 'USER_VIEW'
}

@Injectable({
  providedIn: 'root'
})
export class UserGrantPermission {

  /**
   * Horizontal menu (Header)
   */
  public viewIpsCardGroup() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEMS_VIEW);
  }

  public createIpsCardGroup() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEMS_CREATE);
  }

  public saveIpsCardGroup() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEMS_UPDATE);
  }

  public viewTmsKey() {
    return this.isPermission(UserGrant.SYSTEM_KEYS_VIEW);
  }

  public createTmsKey() {
    return this.isPermission(UserGrant.SYSTEM_KEYS_CREATE);
  }

  public saveTmsKey() {
    return this.isPermission(UserGrant.SYSTEM_KEYS_UPDATE);
  }

  public viewIpsKey() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEM_KEYS_VIEW);
  }

  public createIpsKey() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEM_KEYS_CREATE);
  }

  public saveIpsKey() {
    return this.isPermission(UserGrant.PAYMENT_SYSTEM_KEYS_UPDATE);
  }

  public viewGeneralConfiguration() {
    return this.isPermission(UserGrant.GENERAL_SETTINGS_VIEW);
  }

  public createGeneralConfiguration() {
    return this.isPermission(UserGrant.GENERAL_SETTINGS_CREATE);
  }

  public saveGeneralConfiguration() {
    return this.isPermission(UserGrant.GENERAL_SETTINGS_UPDATE);
  }

  public viewAttestation() {
    return this.isPermission(UserGrant.ATTESTATION_PARAMETERS_VIEW);
  }

  public createAttestationThreadlog() {
    return this.isPermission(UserGrant.ATTESTATION_PARAMETERS_CREATE);
  }

  public saveAttestationThreadlog() {
    return this.isPermission(UserGrant.ATTESTATION_PARAMETERS_UPDATE);
  }

  public saveAttestationThreads() {
    return this.isPermission(UserGrant.ATTESTATION_PARAMETERS_UPDATE);
  }

  public saveAttestationActions() {
    return this.isPermission(UserGrant.ATTESTATION_PARAMETERS_UPDATE);
  }

  public viewBank() {
    return this.isPermission(UserGrant.BANK_VIEW);
  }

  public createBank() {
    return this.isPermission(UserGrant.BANK_CREATE);
  }

  public saveBank() {
    return this.isPermission(UserGrant.BANK_UPDATE);
  }

  public viewUserRole() {
    return this.isPermission(UserGrant.ROLE_VIEW);
  }

  public createUserRole() {
    return this.isPermission(UserGrant.ROLE_CREATE);
  }

  public saveUserRole() {
    return this.isPermission(UserGrant.ROLE_UPDATE);
  }

  /**
   * Vertical menu (Sidebar)
   */
  public viewMerchant() {
    return this.isPermission(UserGrant.MERCHANT_VIEW);
  }

  public createMerchant() {
    return this.isPermission(UserGrant.MERCHANT_CREATE);
  }

  public saveMerchant() {
    return this.isPermission(UserGrant.MERCHANT_UPDATE);
  }

  public viewTerminal() {
    return this.isPermission(UserGrant.TERMINAL_VIEW);
  }

  public createTerminal() {
    return this.isPermission(UserGrant.TERMINAL_CREATE);
  }

  public saveTerminal() {
    return this.isPermission(UserGrant.TERMINAL_UPDATE);
  }

  public viewServiceGroup() {
    return this.isPermission(UserGrant.TERMINAL_GROUPS_VIEW);
  }

  public createServiceGroup() {
    return this.isPermission(UserGrant.TERMINAL_GROUPS_CREATE);
  }

  public saveServiceGroup() {
    return this.isPermission(UserGrant.TERMINAL_GROUPS_UPDATE);
  }

  public viewRegistration() {
    return this.isPermission(UserGrant.REGISTRATION_VIEW);
  }

  public createRegistration() {
    return this.isPermission(UserGrant.REGISTRATION_CREATE);
  }

  public createListRegistration() {
    return this.isPermission(UserGrant.REGISTRATION_CREATE);
  }

  public saveRegistration() {
    return this.isPermission(UserGrant.REGISTRATION_UPDATE);
  }

  public uploadFile() {
    return this.isPermission(UserGrant.REGISTRATION_UPDATE);
  }

  public viewProducts() {
    return this.isPermission(UserGrant.PRODUCTS_VIEW);
  }

  public createProduct() {
    return this.isPermission(UserGrant.PRODUCTS_CREATE);
  }

  public saveProduct() {
    return this.isPermission(UserGrant.PRODUCTS_UPDATE);
  }

  public viewReceiptTemplate() {
    return this.isPermission(UserGrant.RECEIPT_TEMPLATE_VIEW);
  }

  public createReceiptTemplate() {
    return this.isPermission(UserGrant.RECEIPT_TEMPLATE_CREATE);
  }

  public saveReceiptTemplate() {
    return this.isPermission(UserGrant.RECEIPT_TEMPLATE_UPDATE);
  }

  public viewTermKey() {
    return this.isPermission(UserGrant.TERMINAL_KEYS_VIEW);
  }

  public createTermKey() {
    return this.isPermission(UserGrant.TERMINAL_KEYS_CREATE);
  }

  public saveTermKey() {
    return this.isPermission(UserGrant.TERMINAL_KEYS_UPDATE);
  }

  public viewTransactions() {
    return this.isPermission(UserGrant.TRANSACTIONS_VIEW);
  }

  public createTransactions() {
    return this.isPermission(UserGrant.TRANSACTIONS_CREATE);
  }

  public saveTransactions() {
    return this.isPermission(UserGrant.TRANSACTIONS_UPDATE);
  }

  public viewAllowedLanguage() {
    return this.isPermission(UserGrant.APPLICATION_LANGUAGES_VIEW);
  }

  public createAllowedLanguage() {
    return this.isPermission(UserGrant.APPLICATION_LANGUAGES_CREATE);
  }

  public saveAllowedLanguage() {
    return this.isPermission(UserGrant.APPLICATION_LANGUAGES_UPDATE);
  }

  public viewAttestationHistory() {
    return this.isPermission(UserGrant.ATTESTATION_HISTORY_VIEW);
  }

  public createAttestationHistory() {
    return this.isPermission(UserGrant.ATTESTATION_HISTORY_CREATE);
  }

  public saveAttestationHistory() {
    return this.isPermission(UserGrant.ATTESTATION_HISTORY_UPDATE);
  }

  public viewReceiptSendAudit() {
    return this.isPermission(UserGrant.RECEIPT_REQUESTS_VIEW);
  }

  public createReceiptSendAudit() {
    return this.isPermission(UserGrant.RECEIPT_REQUESTS_CREATE);
  }

  public saveReceiptSendAudit() {
    return this.isPermission(UserGrant.RECEIPT_REQUESTS_UPDATE);
  }

  public viewAnalytics() {
    return this.isPermission(UserGrant.ANALYTICS_VIEW);
  }

  public createAnalytics() {
    return this.isPermission(UserGrant.ANALYTICS_CREATE);
  }

  public saveAnalytics() {
    return this.isPermission(UserGrant.ANALYTICS_UPDATE);
  }

  public viewMonitoring() {
    return this.isPermission(UserGrant.MONITORING_VIEW);
  }

  public createMonitoring() {
    return this.isPermission(UserGrant.MONITORING_CREATE);
  }

  public saveMonitoring() {
    return this.isPermission(UserGrant.MONITORING_UPDATE);
  }

  public viewUser() {
    return this.isPermission(UserGrant.USER_VIEW);
  }

  public createUser() {
    return this.isPermission(UserGrant.USER_CREATE);
  }

  public saveUser() {
    return this.isPermission(UserGrant.USER_UPDATE);
  }

  public viewMessage() {
    return this.isPermission(UserGrant.MESSAGE_VIEW);
  }

  public createTemplateMessage() {
    return this.isPermission(UserGrant.MESSAGE_CREATE);
  }

  public saveTemplateMessage() {
    return this.isPermission(UserGrant.MESSAGE_UPDATE);
  }

  isPermission(grant: UserGrant) {
    const userGrants = window.localStorage.getItem('usergrants')
    if (isNotEmpty(userGrants)) return (userGrants.indexOf(grant) === -1) ? false : true;
    return false;
  }
}

export interface Grant {
  authority: string;
  checked: boolean;
}

export interface GroupGrant {
  view: Grant;
  edit: Grant;
  create: Grant;
}

export interface UserRoleModel {
  roleCode: string;
  description: string;
  roleAuthorities: any;
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
  const message: GroupGrant = newGroupGrant('MESSAGE_VIEW', 'MESSAGE_UPDATE', 'MESSAGE_CREATE');

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
    if (authority === 'MESSAGE_VIEW') message.view.checked = true
    if (authority === 'MESSAGE_UPDATE') message.edit.checked = true
    if (authority === 'MESSAGE_CREATE') message.create.checked = true
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
      'message': addGroupGrant(message),
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
  getGroupGrant(src.roleAuthorities['message'], userAuthorityList)

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

const formBuilder: FormBuilder = new FormBuilder();

function addGroupGrant(groupGrant: GroupGrant) {
  return new FormArray([
    formBuilder.group({'grantName': 'View', 'authority': groupGrant.view.authority, 'checked': new FormControl(groupGrant.view.checked)}),
    formBuilder.group({'grantName': 'Edit', 'authority': groupGrant.edit.authority, 'checked': new FormControl(groupGrant.edit.checked)}),
    formBuilder.group({'grantName': 'Create', 'authority': groupGrant.create.authority, 'checked': new FormControl(groupGrant.create.checked)})
  ]);
}

function getGroupGrant(groupGrant: any, dest: any) {
  const groupGrantValue: any = groupGrant.value
  for (let i = 0; i < groupGrantValue.length; i++) {
    if (groupGrantValue[i].checked) dest.push(groupGrantValue[i].authority)
  }
}

function isNotEmpty(val) {
  return !isEmpty(val);
}

function isEmpty(val) {
  return (val === null || val === undefined || val === '') ? true : false;
}
