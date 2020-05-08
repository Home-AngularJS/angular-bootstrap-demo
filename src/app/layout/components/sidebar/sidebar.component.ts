import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service';
import { UserGrant, UserGrantPermission } from '../../../core/model/user-role.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private permission: UserGrantPermission, public dataService: DataService) { }

  ngOnInit() { }

  isMerchantView() {
    return this.permission.isPermission(UserGrant.MERCHANT_VIEW);
  }

  isTerminalView() {
    return this.permission.isPermission(UserGrant.TERMINAL_VIEW);
  }

  isServiceGroupView() {
    return this.permission.isPermission(UserGrant.TERMINAL_GROUPS_VIEW);
  }

  isRegistrationView() {
    return this.permission.isPermission(UserGrant.REGISTRATION_VIEW);
  }

  isProductsView() {
    return this.permission.isPermission(UserGrant.PRODUCTS_VIEW);
  }

  isReceiptTemplateView() {
    return this.permission.isPermission(UserGrant.RECEIPT_TEMPLATE_VIEW);
  }

  isTermKeyView() {
    return this.permission.isPermission(UserGrant.TERMINAL_KEYS_VIEW);
  }

  isTransactionsView() {
    return this.permission.isPermission(UserGrant.TRANSACTIONS_VIEW);
  }

  isAllowedLanguageView() {
    return this.permission.isPermission(UserGrant.APPLICATION_LANGUAGES_VIEW);
  }

  isAttestationHistoryView() {
    return this.permission.isPermission(UserGrant.ATTESTATION_HISTORY_VIEW);
  }

  isReceiptSendAuditView() {
    return this.permission.isPermission(UserGrant.RECEIPT_REQUESTS_VIEW);
  }

  isAnalyticsView() {
    return this.permission.isPermission(UserGrant.ANALYTICS_VIEW);
  }

  isMonitoringView() {
    return this.permission.isPermission(UserGrant.MONITORING_VIEW);
  }

  isUserView() {
    return this.permission.isPermission(UserGrant.USER_VIEW);
  }

  isMessageView() {
    return this.permission.isPermission(UserGrant.MESSAGE_VIEW);
  }
}
