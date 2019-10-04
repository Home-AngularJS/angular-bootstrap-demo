import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TokenInterceptor } from './core/interceptor';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
// import { Ng2DatetimePickerModule, Ng2Datetime } from 'ng2-datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { TabModule } from 'angular-tabs-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { ServiceGroupComponent } from './layout/service-group/service-group.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { TransactionComponent } from './layout/transaction/transaction.component';
import { CardMaskGroupComponent } from './layout/card-mask-group/card-mask-group.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
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
import { ApiService } from './core/service/api.service';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: true
};

// // Override Date object formatter (my own function that returns a string)
// Ng2Datetime.formatDate = (date: Date) : string => {
//   return '1/1/2015 00:00';
// };
//
// // Override Date object parser (my own function that returns a date)
// Ng2Datetime.parseDate = (str: any): Date => {
//   return new Date();
// };

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PerfectScrollbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2DatetimePickerModule,
    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
    MyDatePickerModule,
    TabModule,
    DialogModule
  ],
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ServiceGroupComponent,
    TerminalComponent,
    TransactionComponent,
    CardMaskGroupComponent,
    AllowedLanguageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    GeneralConfigurationComponent,
    BankInfoComponent,
    BankComponent,
    IpsCardGroupComponent,
    ProductsComponent,
    TmsKeyComponent,
    IpsKeyComponent,
    TermKeyComponent,
    ReceiptTemplateComponent,
    MerchantComponent
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
