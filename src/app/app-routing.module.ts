import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
// import { AddUserComponent } from './layout/user/add-user/add-user.component';
// import { ListUserComponent } from './layout/user/list-user/list-user.component';
// import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { ServiceGroupComponent } from './layout/service-group/service-group.component';
import { TransactionModule } from './layout/transaction/transaction.module';
import { HomeComponent } from './layout/home/home.component';
import { CardMaskGroupComponent } from './layout/card-mask-group/card-mask-group.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { GeneralConfigurationComponent } from './layout/general-configuration/general-configuration.component';
import { BankComponent } from './layout/bank/bank.component';
import { IpsCardGroupComponent } from './layout/ips-card-group/ips-card-group.component';
import { ProductsComponent } from './layout/products/products.component';
import { TmsKeyComponent } from './layout/tms-key/tms-key.component';
import { IpsKeyComponent } from './layout/ips-key/ips-key.component';
import { TermKeyComponent } from './layout/term-key/term-key.component';
import { ReceiptTemplateComponent } from './layout/receipt-template/receipt-template.component';
import { MerchantComponent } from './layout/merchant/merchant.component';
import { AttestationComponent } from './layout/attestation/attestation.component';
import { AttestationHistoryComponent } from './layout/attestation-history/attestation-history.component';
import { ReceiptSendAuditModule } from './layout/receipt-send-audit/receipt-send-audit.module';
import { BackgroundJobComponent } from './layout/background-job/background-job.component';
import { AnalyticsComponent } from './layout/analytics/analytics.component';
import { MonitoringComponent } from './layout/monitoring/monitoring.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { UserRoleComponent } from './layout/user-role/user-role.component';
import { UserComponent } from './layout/user/user.component';
import { MessageModule } from './layout/message/message.module';
import { Message2Component } from './layout/message2/message2.component';
import { UserAuthentication } from './core/_helpers/auth.user';
import { UserGrant } from './core/model/user-role.model';

/**
 * @see https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9
 * @see https://stackoverflow.com/questions/56375703/angular-8-lazy-loading-modules-error-ts1323-dynamic-import-is-only-supporte
 *      http://qaru.site/questions/17710410/angular-8-lazy-loading-modules-error-ts1323-dynamic-import-is-only-supported-when-module-flag-is-commonjs-or-esnext
 * @desc TS1323: Dynamic import is only supported when '--module' flag is 'commonjs' or 'esNext'.
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'add-user', component: AddUserComponent },
  // { path: 'list-user', component: ListUserComponent },
  // { path: 'edit-user', component: EditUserComponent },
  { path: '', loadChildren: () => TransactionModule }, // { path: '', component : TransactionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service-group', component: ServiceGroupComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.TERMINAL_GROUPS_VIEW] } },
  { path: 'terminal', component: TerminalComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.TERMINAL_VIEW] } },
  { path: 'transaction', loadChildren: () => TransactionModule, canActivate: [UserAuthentication], data: { grant: [UserGrant.TRANSACTIONS_VIEW] } },
  // { path: 'card-mask-group', component: CardMaskGroupComponent },
  { path: 'allowed-language', component: AllowedLanguageComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.APPLICATION_LANGUAGES_VIEW] } },
  { path: 'general-configuration', component: GeneralConfigurationComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.GENERAL_SETTINGS_VIEW] } },
  { path: 'bank', component: BankComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.BANK_VIEW] } },
  { path: 'ips-card-group', component: IpsCardGroupComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.PAYMENT_SYSTEMS_VIEW] } },
  { path: 'products', component: ProductsComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.PRODUCTS_VIEW] } },
  { path: 'tms-key', component: TmsKeyComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.SYSTEM_KEYS_VIEW] } },
  { path: 'ips-key', component: IpsKeyComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.PAYMENT_SYSTEM_KEYS_VIEW] } },
  { path: 'term-key', component: TermKeyComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.TERMINAL_KEYS_VIEW] } },
  { path: 'receipt-template', component: ReceiptTemplateComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.RECEIPT_TEMPLATE_VIEW] } },
  { path: 'merchant', component: MerchantComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.MERCHANT_VIEW] } },
  { path: 'attestation', component: AttestationComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.ATTESTATION_PARAMETERS_VIEW] } },
  { path: 'attestation-history', component: AttestationHistoryComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.ATTESTATION_HISTORY_VIEW] } },
  { path: 'receipt-send-audit', loadChildren: () => ReceiptSendAuditModule, canActivate: [UserAuthentication], data: { grant: [UserGrant.RECEIPT_REQUESTS_VIEW] } },
  { path: 'background-job', component: BackgroundJobComponent },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.ANALYTICS_VIEW] } },
  { path: 'monitoring', component: MonitoringComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.MONITORING_VIEW] } },
  { path: 'registration', component: RegistrationComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.ROLE_VIEW] } },
  { path: 'user-role', component: UserRoleComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.ROLE_VIEW] } },
  { path: 'user', component: UserComponent, canActivate: [UserAuthentication], data: { grant: [UserGrant.USER_VIEW] } },
  {
    path: 'message',
    children: [
      { path: '', loadChildren: () => MessageModule, canActivate: [UserAuthentication], data: { grant: [UserGrant.MESSAGE_VIEW] } },
      { path: '1588576528675', loadChildren: () => MessageModule, canActivate: [UserAuthentication], data: { grant: [UserGrant.MESSAGE_VIEW] } }, // TODO: refresh time  (one-static)
      { path: ':t', loadChildren: () => MessageModule, canActivate: [UserAuthentication], data: { grant: [UserGrant.MESSAGE_VIEW] } } // TODO: refresh time (all-another)
    ]
  },
  // { path: 'message2', component: Message2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
