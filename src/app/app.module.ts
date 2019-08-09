import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TokenInterceptor } from './core/interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { TerminalGroupsComponent } from './layout/terminal-groups/terminal-groups.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { TransactionComponent } from './layout/transaction/transaction.component';
import { PanMaskedComponent } from './layout/pan-masked/pan-masked.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { BankComponent } from './layout/bank/bank.component';
import { MpsComponent } from './layout/mps/mps.component';
import { ProductsComponent } from './layout/products/products.component';
import { ApiService } from './core/service/api.service';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    TerminalGroupsComponent,
    TerminalComponent,
    TransactionComponent,
    PanMaskedComponent,
    AllowedLanguageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    SettingsComponent,
    BankComponent,
    MpsComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
