import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalComponent } from './terminal/terminal.component';
import { TerminalGroupsComponent } from './terminal-groups/terminal-groups.component';
import { TransactionComponent } from './transaction/transaction.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", pathMatch: "full",redirectTo: "home"},
  {path: "home", component: HomeComponent},
  {path: "terminal-groups", component: TerminalGroupsComponent},
  {path: "terminal", component: TerminalComponent},
  {path: "transaction", component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
