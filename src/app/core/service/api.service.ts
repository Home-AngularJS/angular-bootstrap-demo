import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { ApiResponse } from '../model/api.response';
import { filterTransactionToUrl } from '../model/transaction.model';
import { filterTerminalToUrl } from '../model/terminal.model';
import { filterMerchantToUrl } from '../model/merchant.model';
import { RequestOptions } from '@angular/http';
import { Moment } from 'moment';

@Injectable()
export class ApiService {

  /**
   * @local server
   */
  host = 'http://192.168.1.124:9000'; //TODO:
  // host = 'https://192.168.1.124:9000';
  /**
   * @remote server
   */
  // host = 'https://map1.mobo.cards:8093'; //TODO:
  // host = 'https://192.168.1.124:9001';

  baseUrl: string = this.host;
  terminalUrl: string = this.host + '/api/v1/terminals';
  serviceGroupsUrl: string = this.host + '/api/v1/service-groups';
  transactionUrl: string = this.host + '/api/v1/transactions';
  transactionsReceiptUrl: string = this.host + '/api/v1/transactions/receipt';
  transactionsAnalyticUrl: string = this.host + '/api/v1/transactions/analytics/admin';
  cardMaskGroupsUrl: string = this.host + '/api/v1/card-mask-groups';
  deviceUrl: string = this.host + '/api/v1/devices';
  generalConfigurationUrl: string = this.host + '/api/v1/general-configuration';
  tmsKeyUrl: string = this.host + '/api/v1/tms-keys';
  ipsKeyUrl: string = this.host + '/api/v1/ips-keys';
  termKeyUrl: string = this.host + '/api/v1/term-keys';
  receiptTemplateUrl: string = this.host + '/api/v1/receipt-templates';
  receiptTemplatePreviewUrl: string = this.host + '/api/v1/receipt-templates/preview';
  bankInfoUrl: string = this.host + '/api/v1/bank-info';
  bankUrl: string = this.host + '/api/v1/banks';
  ipsCardGroupUrl: string = this.host + '/api/v1/ips-card-groups';
  productUrl: string = this.host + '/api/v1/products';
  receiptSendChannelUrl: string = this.host + '/api/v1/receipt-send-channels';
  merchantUrl: string = this.host + '/api/v1/merchants';
  attestationActionsUrl: string = this.host + '/api/v1/attestation-actions';
  attestationThreatsUrl: string = this.host + '/api/v1/attestation-threats';
  attestationThreatSequencesUrl: string = this.host + '/api/v1/attestation-threat-sequences';
  attestationUrl: string = this.host + '/api/v1/attestation';
  attestationAnalyticUrl: string = this.host + '/api/v1/attestation/analytics';
  receiptSendAuditUrl: string = this.host + '/api/v1/receipt-send-audits';
  backgroundJobUrl: string = this.host + '/api/v1/background-jobs';
  monitoringUrl: string = this.host + '/api/v1/monitoring';
  registrationUrl: string = this.host + '/api/v1/registration';
  registerBatchTerminalDataUrl: string = this.registrationUrl + '/batch';
  userRoleUrl: string = this.host + '/api/v1/user-roles';
  userAuthorityUrl: string = this.host + '/api/v1/user-authorities';
  userUrl: string = this.host + '/api/v1/users';
  currencyUrl: string = this.host + '/api/v1/currencies';
  messageUrl: string = this.host + '/api/v1/messages';
  messageHistoryUrl: string = this.messageUrl + '/history';
  messageTemplateUrl: string = this.host + '/api/v1/message-template';
  languageItemUrl: string = this.host + '/api/v1/language-items';

  constructor(private http: HttpClient) { }

  /**
   * Authentication
   */
  login(loginPayload): Observable<ApiResponse> {
    const headers = new HttpHeaders().set('Authorization', '');  // https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5  |  https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request  |  https://ionicacademy.com/ionic-http-interceptor   ( https://www.jujens.eu/posts/en/2015/Jun/27/webdav-options  |  https://metanit.com/web/angular2/6.5.php  |  https://auth0.com/blog/cors-tutorial-a-guide-to-cross-origin-resource-sharing )
    return this.http.post<ApiResponse>(this.baseUrl + '/' + 'api/v1/auth/token', loginPayload, { headers: headers });
  }

  /**
   * Terminal API
   */
  findAllTerminals(): Observable<any> {
    return this.http.get<any>(this.terminalUrl);
  }

  findTerminals(anyFilterTerminals: any): Observable<any> {
    console.log(anyFilterTerminals);
    const terminalUrl = this.terminalUrl + filterTerminalToUrl(anyFilterTerminals)
    return this.http.get<any>(terminalUrl);
  }

  updateTerminal(anyTerminalId: any, anyTerminal: any): Observable<any> {
    console.log(anyTerminalId);
    const terminalId = anyTerminalId;
    console.log(anyTerminal);
    const terminal = anyTerminal;
    return this.http.put<any>(this.terminalUrl + '/' + terminalId, terminal);
  }

  /**
   * Service-Group API
   */
  findAllServiceGroups(): Observable<any> {
    return this.http.get<any>(this.serviceGroupsUrl + '?sort=groupNumber,asc'); //return this.http.get<any>(this.serviceGroupsUrl + '?page=0&size=18&sort=groupNumber,asc');
  }

  createServiceGroup(anyTerminalGroup: any): Observable<any> {
    console.log(anyTerminalGroup);
    const terminalGroup = anyTerminalGroup;
    return this.http.post<any>(this.serviceGroupsUrl, terminalGroup);
  }

  updateServiceGroup(anyTerminalGroup: any): Observable<any> {
    console.log(anyTerminalGroup);
    const terminalGroup = anyTerminalGroup;
    return this.http.put<any>(this.serviceGroupsUrl + '/' + terminalGroup.groupNumber, terminalGroup);
  }

  /**
   * Transaction API
   */
  findAllTransactions(): Observable<any> {
    return this.http.get<any>(this.transactionUrl);
  }

  findTransactions(anyFilterTransactions: any): Observable<any> {
    console.log(anyFilterTransactions);
    const transactionUrl = this.transactionUrl + filterTransactionToUrl(anyFilterTransactions)
    return this.http.get<any>(transactionUrl);
  }

  /**
   * Card-Mask-Group API
   */
  findAllCardMaskGroups(): Observable<any> {
    return this.http.get<any>(this.cardMaskGroupsUrl);
  }

  createCardMaskGroup(anyPanMasked: any): Observable<any> {
    console.log(anyPanMasked);
    const panMasked = anyPanMasked;
    return this.http.post<any>(this.cardMaskGroupsUrl, panMasked);
  }

  updateCardMaskGroup(anyPanMasked: any): Observable<any> {
    console.log(anyPanMasked);
    const panMasked = anyPanMasked;
    return this.http.put<any>(this.cardMaskGroupsUrl + '/' + panMasked.id, panMasked);
  }

  /**
   * Device API
   */
  findAllDevices(): Observable<any> {
    return this.http.get<any>(this.deviceUrl );
  }

  findDeviceByTerminalId(terminalId: any): Observable<any> {
    return this.http.get<any>(this.deviceUrl + '/terminal/' + terminalId);
  }

  /**
   * Settings API
   */
  getGeneralConfiguration(): Observable<any> {
    return this.http.get<any>(this.generalConfigurationUrl );
  }

  updateGeneralConfiguration(anySettings: any): Observable<any> {
    console.log(anySettings);
    const settings = anySettings;
    return this.http.put<any>(this.generalConfigurationUrl, settings);
  }

  /**
   * TmsKey API
   */
  findAllTmsKeys(): Observable<any> {
    return this.http.get<any>(this.tmsKeyUrl + '?page=0&size=18&sort=id,asc');
  }

  createTmsKey(anyTmsKey: any): Observable<any> {
    console.log(anyTmsKey);
    const tmsKey = anyTmsKey;
    return this.http.post<any>(this.tmsKeyUrl, tmsKey);
  }

  updateTmsKey(anyTmsKey: any): Observable<any> {
    console.log(anyTmsKey);
    const tmsKey = anyTmsKey;
    return this.http.put<any>(this.tmsKeyUrl + '/' + tmsKey.id, tmsKey);
  }

  /**
   * IpsKey API
   */
  findAllIpsKeys(): Observable<any> {
    return this.http.get<any>(this.ipsKeyUrl + '?page=0&size=18&sort=id,asc');
  }

  createIpsKey(anyIpsKey: any): Observable<any> {
    console.log(anyIpsKey);
    const ipsKey = anyIpsKey;
    return this.http.post<any>(this.ipsKeyUrl, ipsKey);
  }

  updateIpsKey(anyIpsKey: any): Observable<any> {
    console.log(anyIpsKey);
    const ipsKey = anyIpsKey;
    return this.http.put<any>(this.ipsKeyUrl + '/' + ipsKey.id, ipsKey);
  }

  /**
   * TermKey API
   */
  findAllTermKeys(): Observable<any> {
    return this.http.get<any>(this.termKeyUrl + '?page=0&size=18&sort=id,asc');
  }

  createTermKey(anyTermKey: any): Observable<any> {
    console.log(anyTermKey);
    const termKey = anyTermKey;
    return this.http.post<any>(this.termKeyUrl, termKey);
  }

  updateTermKey(anyTermKey: any): Observable<any> {
    console.log(anyTermKey);
    const termKey = anyTermKey;
    return this.http.put<any>(this.termKeyUrl + '/' + termKey.id, termKey);
  }

  /**
   * Receipt Template API
   */
  findAllReceiptTemplates(): Observable<any> {
    return this.http.get<any>(this.receiptTemplateUrl + '?page=0&size=18&sort=id,asc');
  }

  createReceiptTemplate(anyReceiptTemplate: any): Observable<any> {
    console.log(anyReceiptTemplate);
    const receiptTemplate = anyReceiptTemplate;
    return this.http.post<any>(this.receiptTemplateUrl, receiptTemplate);
  }

  updateReceiptTemplate(anyReceiptTemplate: any): Observable<any> {
    console.log(anyReceiptTemplate);
    const receiptTemplate = anyReceiptTemplate;
    return this.http.put<any>(this.receiptTemplateUrl + '/' + receiptTemplate.id, receiptTemplate);
  }

  saveReceiptTemplatePreview(anyReceiptTemplatePreview: any): Observable<any> {
    console.log(anyReceiptTemplatePreview);
    const receiptTemplatePreview = anyReceiptTemplatePreview;
    return this.http.post<any>(this.receiptTemplatePreviewUrl, receiptTemplatePreview);
  }

  /**
   * BankInfo API
   */
  getBankInfo(): Observable<any> {
    return this.http.get<any>(this.bankInfoUrl);
  }

  createBankInfo(anyBankInfo: any): Observable<any> {
    console.log(anyBankInfo);
    const bankInfo = anyBankInfo;
    return this.http.post<any>(this.bankInfoUrl, bankInfo);
  }

  updateBankInfo(anyBankInfo: any): Observable<any> {
    console.log(anyBankInfo);
    const bankInfo = anyBankInfo;
    return this.http.put<any>(this.bankInfoUrl, bankInfo);
  }


  /**
   * Bank API
   */
  findAllBanks(): Observable<any> {
    return this.http.get<any>(this.bankUrl);
  }

  createBank(anyBank: any): Observable<any> {
    console.log(anyBank);
    const bank = anyBank;
    return this.http.post<any>(this.bankUrl, bank);
  }

  updateBank(anyBankId: any, anyBank: any): Observable<any> {
    console.log(anyBankId);
    console.log(anyBank);
    const bankId = anyBankId;
    const bank = anyBank;
    return this.http.put<any>(this.bankUrl + '/' + bankId, bank);
  }


  /**
   * IpsCardGroup API
   */
  findAllIpsCardGroups(): Observable<any> {
    return this.http.get<any>(this.ipsCardGroupUrl + '?page=0&size=18&sort=ipsCardGroupId,asc');
  }

  findIpsCardGroupById(anyIpsCardGroupId: any): Observable<any> {
    console.log(anyIpsCardGroupId);
    const ipsCardGroupId = anyIpsCardGroupId;
    return this.http.get<any>(this.ipsCardGroupUrl + '/' + ipsCardGroupId);
  }

  createIpsCardGroup(anyIpsCardGroup: any): Observable<any> {
    console.log(anyIpsCardGroup);
    const ipsCardGroup = anyIpsCardGroup;
    return this.http.post<any>(this.ipsCardGroupUrl, ipsCardGroup);
  }

  /**
   * Product API
   */
  findAllProducts(): Observable<any> {
    return this.http.get<any>(this.productUrl + '?page=0&size=18&sort=productId,asc');
  }

  findProductById(anyProductId: any): Observable<any> {
    console.log(anyProductId);
    const productId = anyProductId;
    return this.http.get<any>(this.productUrl + '/' + productId);
  }

  createProduct(anyProduct: any): Observable<any> {
    console.log(anyProduct);
    const product = anyProduct;
    return this.http.post<any>(this.productUrl, product);
  }

  updateProduct(anyProductId: any, anyProduct: any): Observable<any> {
    console.log(anyProductId);
    console.log(anyProduct);
    const productId = anyProductId;
    const product = anyProduct;
    return this.http.put<any>(this.productUrl + '/' + productId, product);
  }

  /**
   * ReceiptSendChannel API
   */
  findAllReceiptSendChannels(): Observable<any> {
    return this.http.get<any>(this.receiptSendChannelUrl);
  }

  // updateReceiptSendChannel(anyReceiptSendChannel: any): Observable<any> {
  //   console.log(anyReceiptSendChannel);
  //   const receiptSendChannel = anyReceiptSendChannel;
  //   return this.http.put<any>(this.receiptSendChannelUrl + '/' + receiptSendChannel.id, receiptSendChannel);
  // }


  /**
   * Merchant API
   */
  findAllMerchants(): Observable<any> {
    return this.http.get<any>(this.merchantUrl + '?page=1&size=17&sort=asc&sort=merchantId');
  }

  findMerchants(anyFilterMerchants: any): Observable<any> {
    console.log(anyFilterMerchants);
    const merchantUrl = this.merchantUrl + filterMerchantToUrl(anyFilterMerchants)
    return this.http.get<any>(merchantUrl);
  }

  updateMerchant(anyMerchantId: any, anyMerchant: any): Observable<any> {
    console.log(anyMerchantId);
    console.log(anyMerchant);
    const merchantId = anyMerchantId;
    const merchant = anyMerchant;
    return this.http.put<any>(this.merchantUrl + '/' + merchantId, merchant);
  }


  /**
   * Attestation-Action API
   */
  findAllAttestationActions(): Observable<any> {
    return this.http.get<any>(this.attestationActionsUrl);
  }

  updateAttestationAction(anyAttestationActionId: any, anyAttestationAction: any): Observable<any> {
    console.log(anyAttestationActionId);
    console.log(anyAttestationAction);
    const attestationActionId = anyAttestationActionId;
    const attestationAction = anyAttestationAction;
    return this.http.put<any>(this.attestationActionsUrl + '/' + attestationActionId, attestationAction);
  }


  /**
   * Attestation-Threat API
   */
  findAllAttestationThreats(): Observable<any> {
    return this.http.get<any>(this.attestationThreatsUrl);
  }

  updateAttestationThreat(anyAttestationThreatId: any, anyAttestationThreat: any): Observable<any> {
    console.log(anyAttestationThreatId);
    console.log(anyAttestationThreat);
    const attestationThreatId = anyAttestationThreatId;
    const attestationThreat = anyAttestationThreat;
    return this.http.put<any>(this.attestationThreatsUrl + '/' + attestationThreatId, attestationThreat);
  }


  /**
   * Attestation-Threat-Sequence API
   */
  findAllAttestationThreatSequences(): Observable<any> {
    return this.http.get<any>(this.attestationThreatSequencesUrl);
  }

  createAttestationThreatSequence(anyAttestationThreatSequence: any): Observable<any> {
    console.log(anyAttestationThreatSequence);
    const attestationThreatSequence = anyAttestationThreatSequence;
    return this.http.post<any>(this.attestationThreatSequencesUrl, attestationThreatSequence);
  }

  updateAttestationThreatSequence(anyAttestationThreatSequenceId: any, anyAttestationThreatSequence: any): Observable<any> {
    console.log(anyAttestationThreatSequenceId);
    console.log(anyAttestationThreatSequence);
    const attestationThreatSequenceId = anyAttestationThreatSequenceId;
    const attestationThreatSequence = anyAttestationThreatSequence;
    return this.http.put<any>(this.attestationThreatSequencesUrl + '/' + attestationThreatSequenceId, attestationThreatSequence);
  }


  /**
   * Attestation API
   */
  findAllAttestations(): Observable<any> {
    return this.http.get<any>(this.attestationUrl);
  }

  saveAttestationParams(anyAttestationId: any, anyAttestation: any): Observable<any> {
    console.log(anyAttestationId);
    console.log(anyAttestation);
    const attestationId = anyAttestationId;
    const attestation = anyAttestation;
    return this.http.put<any>(this.attestationUrl + '/' + attestationId, attestation);
  }


  /**
   * Receipt-Send-Audit API
   */
  findAllReceiptSendAudits(): Observable<any> {
    return this.http.get<any>(this.receiptSendAuditUrl);
  }


  /**
   * Background-Job API
   */
  findAllBackgroundJobs(): Observable<any> {
    return this.http.get<any>(this.backgroundJobUrl);
  }

  updateBackgroundJob(anyBackgroundJobName: any, anyBackgroundJob: any): Observable<any> {
    console.log(anyBackgroundJobName);
    console.log(anyBackgroundJob);
    const backgroundJobName = anyBackgroundJobName;
    const backgroundJob = anyBackgroundJob;
    return this.http.put<any>(this.backgroundJobUrl + '/' + backgroundJobName, backgroundJob);
  }


  /**
   * Transactions Analytics API
   * @see https://stackoverflow.com/questions/41505492/how-to-subtract-one-month-using-moment-js/41505553
   */
  findDailyTransactionsAnalytics(): Observable<any> {
    return this.http.get<any>(this.transactionsAnalyticUrl + '/daily');
  }

  findTransactionsAnalytics(startDate: Moment, endDate: Moment): Observable<any> {
    const formatDate = 'YYYY-MM-DD'
    return this.http.get<any>(this.transactionsAnalyticUrl + '/monthly?startDate=' + startDate.format(formatDate) + '&endDate=' + endDate.format(formatDate));
  }

  /**
   * Monitoring Data API
   */
  getMonitoringData(): Observable<any> {
    return this.http.get<any>(this.monitoringUrl);
  }

  /**
   * Attestations Analytics API
   */
  getAttestationAnalytics(): Observable<any> {
    return this.http.get<any>(this.attestationAnalyticUrl);
  }

  /**
   * Register Terminal-Data API
   */
  findAllRegistrationData(): Observable<any> {
    return this.http.get<any>(this.registrationUrl);
  }

  registerTerminalData(anyRegisterTerminal: any): Observable<any> {
    console.log(anyRegisterTerminal);
    const registerTerminal = anyRegisterTerminal;
    return this.http.post<any>(this.registrationUrl, registerTerminal);
  }

  /**
   * User Role API
   */
  findAllUserAuthorities(): Observable<any> {
    return this.http.get<any>(this.userAuthorityUrl);
  }

  findAllUserRoles(): Observable<any> {
    return this.http.get<any>(this.userRoleUrl);
  }

  updateRole(anyRoleName: any, anyRole: any): Observable<any> {
    console.log(anyRoleName);
    console.log(anyRole);
    const roleName = anyRoleName;
    const role = anyRole;
    return this.http.put<any>(this.userRoleUrl + '/' + roleName, role);
  }

  /**
   * User API
   */
  findAllUsers(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }

  registerNewUser(anyRegisterNewUser: any): Observable<any> {
    console.log(anyRegisterNewUser);
    const registerNewUser = anyRegisterNewUser;
    return this.http.post<any>(this.userUrl, registerNewUser);
  }

  assignRolesToUser(anyUserName: any, anyUserRoleCodeList: any): Observable<any> {
    console.log(anyUserName);
    console.log(anyUserRoleCodeList);
    const userName = anyUserName;
    const userRoleCodeList = anyUserRoleCodeList;
    return this.http.put<any>(this.userUrl + '/' + userName, userRoleCodeList);
  }

  /**
   * Currency API
   */
  findAllCurrencies(): Observable<any> {
    return this.http.get<any>(this.currencyUrl);
  }

  /**
   * Message API
   */
  sendMessage(anyMessage: any): Observable<any> {
    console.log(anyMessage);
    const message = anyMessage;
    return this.http.post<any>(this.messageUrl, message);
  }

  getMessageHistory(anyMessageHistory: any): Observable<any> {
    console.log(anyMessageHistory);
    const messageHistory = anyMessageHistory;
    return this.http.post<any>(this.messageHistoryUrl, messageHistory);
  }

  findAllMessageTemplate(): Observable<any> {
    return this.http.get<any>(this.messageTemplateUrl);
  }

  createMessageTemplate(anyMessageTemplate: any): Observable<any> {
    console.log(anyMessageTemplate);
    const messageTemplate = anyMessageTemplate;
    return this.http.post<any>(this.messageTemplateUrl, messageTemplate);
  }

  deleteMessageTemplate(anyMessageTemplateId: any): Observable<any> {
    console.log(anyMessageTemplateId);
    const messageTemplateId = anyMessageTemplateId;
    return this.http.delete<any>(this.messageTemplateUrl + '/' + messageTemplateId);
  }

  /**
   * Language Item API
   */
  findAllLanguageItem(): Observable<any> {
    return this.http.get<any>(this.languageItemUrl);
  }
}
