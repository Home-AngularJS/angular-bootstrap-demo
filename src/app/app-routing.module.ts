import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { ServiceGroupComponent } from './layout/service-group/service-group.component';
import { TransactionComponent } from './layout/transaction/transaction.component';
import { HomeComponent } from './layout/home/home.component';
import { CardMaskGroupComponent } from './layout/card-mask-group/card-mask-group.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { GeneralConfigurationComponent } from './layout/general-configuration/general-configuration.component';
import { BankInfoComponent } from './layout/bank-info/bank-info.component';
import { IpsCardGroupComponent } from './layout/ips-card-group/ips-card-group.component';
import { ProductsComponent } from './layout/products/products.component';
import { TmsKeyComponent } from './layout/tms-key/tms-key.component';
import { IpsKeyComponent } from './layout/ips-key/ips-key.component';
import { TermKeyComponent } from './layout/term-key/term-key.component';
import { ReceiptTemplateComponent } from './layout/receipt-template/receipt-template.component';
import { MerchantComponent } from './layout/merchant/merchant.component';

/**
 * https://medium.com/lacolaco-blog/introduce-router-scroller-in-angular-v6-1-ef34278461e9
 */
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: '', component : MerchantComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service-group', component: ServiceGroupComponent} ,
  { path: 'terminal', component: TerminalComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'card-mask-group', component: CardMaskGroupComponent },
  { path: 'allowed-language', component: AllowedLanguageComponent },
  { path: 'general-configuration', component: GeneralConfigurationComponent },
  { path: 'bank-info', component: BankInfoComponent },
  { path: 'ips-card-group', component: IpsCardGroupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'tms-key', component: TmsKeyComponent },
  { path: 'ips-key', component: IpsKeyComponent },
  { path: 'term-key', component: TermKeyComponent },
  { path: 'receipt-template', component: ReceiptTemplateComponent },
  { path: 'merchant', component: MerchantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
