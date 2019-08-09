import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { TerminalGroupsComponent } from './layout/terminal-groups/terminal-groups.component';
import { TransactionComponent } from './layout/transaction/transaction.component';
import { HomeComponent } from './layout/home/home.component';
import { PanMaskedComponent } from './layout/pan-masked/pan-masked.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { BankComponent } from './layout/bank/bank.component';
import { MpsComponent } from './layout/mps/mps.component';
import { ProductsComponent } from './layout/products/products.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path : '', component : HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'service-groups', component: TerminalGroupsComponent} ,
  { path: 'terminal', component: TerminalComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'card-mask-group', component: PanMaskedComponent },
  { path: 'allowed-language', component: AllowedLanguageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'bank', component: BankComponent },
  { path: 'mps', component: MpsComponent },
  { path: 'products', component: ProductsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
