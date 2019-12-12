import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { Terminal2Component } from './layout/terminal2/terminal2.component';
import { ServiceGroupComponent } from './layout/service-group/service-group.component';
import { TransactionModule } from './layout/transaction/transaction.module';
import { HomeComponent } from './layout/home/home.component';
import { CardMaskGroupComponent } from './layout/card-mask-group/card-mask-group.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { GeneralConfigurationComponent } from './layout/general-configuration/general-configuration.component';
import { BankInfoComponent } from './layout/bank-info/bank-info.component';
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

/**
 * @see https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9
 * @see https://stackoverflow.com/questions/56375703/angular-8-lazy-loading-modules-error-ts1323-dynamic-import-is-only-supporte
 *      http://qaru.site/questions/17710410/angular-8-lazy-loading-modules-error-ts1323-dynamic-import-is-only-supported-when-module-flag-is-commonjs-or-esnext
 * @desc TS1323: Dynamic import is only supported when '--module' flag is 'commonjs' or 'esNext'.
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: '', loadChildren: () => TransactionModule }, // { path: '', component : TransactionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service-group', component: ServiceGroupComponent} ,
  { path: 'terminal', component: TerminalComponent },
  { path: 'terminal2', component: Terminal2Component },
  { path: 'transaction', loadChildren: () => TransactionModule },
  { path: 'card-mask-group', component: CardMaskGroupComponent },
  { path: 'allowed-language', component: AllowedLanguageComponent },
  { path: 'general-configuration', component: GeneralConfigurationComponent },
  { path: 'bank-info', component: BankInfoComponent },
  { path: 'bank', component: BankComponent },
  { path: 'ips-card-group', component: IpsCardGroupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'tms-key', component: TmsKeyComponent },
  { path: 'ips-key', component: IpsKeyComponent },
  { path: 'term-key', component: TermKeyComponent },
  { path: 'receipt-template', component: ReceiptTemplateComponent },
  { path: 'merchant', component: MerchantComponent },
  { path: 'attestation', component: AttestationComponent },
  { path: 'attestation-history', component: AttestationHistoryComponent },
  { path: 'receipt-send-audit', loadChildren: () => ReceiptSendAuditModule },
  { path: 'background-job', component: BackgroundJobComponent },
  { path: 'analytics', component: AnalyticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
