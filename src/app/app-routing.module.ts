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
import { BankComponent } from './layout/bank/bank.component';
import { MpsComponent } from './layout/mps/mps.component';
import { ProductsComponent } from './layout/products/products.component';
import { TmsKeyComponent } from './layout/tms-key/tms-key.component';
import { TicketTemplateComponent } from './layout/ticket-template/ticket-template.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path : '', component : HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service-group', component: ServiceGroupComponent} ,
  { path: 'terminal', component: TerminalComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'card-mask-group', component: CardMaskGroupComponent },
  { path: 'allowed-language', component: AllowedLanguageComponent },
  { path: 'general-configuration', component: GeneralConfigurationComponent },
  { path: 'bank', component: BankComponent },
  { path: 'mps', component: MpsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'tms-key', component: TmsKeyComponent },
  { path: 'ticket-template', component: TicketTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
