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
import { CommonModule } from '@angular/common';
import { SmartTableModule } from 'smart-table-ng';
import { ToastrModule } from 'ngx-toastr';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DatePipe } from '@angular/common';
import { UiSwitchModule } from 'ngx-ui-switch';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUserComponent } from './layout/user/list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './layout/user/add-user/add-user.component';
import { EditUserComponent } from './layout/user/edit-user/edit-user.component';
import { ServiceGroupComponent } from './layout/service-group/service-group.component';
import { TerminalComponent } from './layout/terminal/terminal.component';
import { TerminalRest } from './core/service/terminal.rest';
import { TransactionRest } from './core/service/transaction.rest';
import { CardMaskGroupComponent } from './layout/card-mask-group/card-mask-group.component';
import { AllowedLanguageComponent } from './layout/allowed-language/allowed-language.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { GeneralConfigurationComponent } from './layout/general-configuration/general-configuration.component';
import { BankComponent } from './layout/bank/bank.component';
import { IpsCardGroupComponent } from './layout/ips-card-group/ips-card-group.component';
import { ProductsComponent } from './layout/products/products.component';
import { TmsKeyComponent } from './layout/tms-key/tms-key.component';
import { IpsKeyComponent } from './layout/ips-key/ips-key.component';
import { TermKeyComponent } from './layout/term-key/term-key.component';
import { ReceiptTemplateComponent, SafePipe2 } from './layout/receipt-template/receipt-template.component';
import { MerchantComponent } from './layout/merchant/merchant.component';
import { MerchantRest } from './core/service/merchant.rest';
import { AttestationComponent } from './layout/attestation/attestation.component';
import { AttestationHistoryComponent } from './layout/attestation-history/attestation-history.component';
import { AttestationHistoryRest } from './core/service/attestation-history.rest';
import { ReceiptSendAuditRest } from './core/service/receipt-send-audit.rest';
import { BackgroundJobComponent } from './layout/background-job/background-job.component';
import { AnalyticsComponent } from './layout/analytics/analytics.component';
import { MonitoringComponent } from './layout/monitoring/monitoring.component';
import { RegistrationComponent } from './layout/registration/registration.component';
import { RegistrationRest } from './core/service/registration.rest';
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
    DialogModule,
    SmartTableModule,
    CommonModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
    UiSwitchModule
  ],
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    AddUserComponent,
    EditUserComponent,
    ServiceGroupComponent,
    TerminalComponent,
    CardMaskGroupComponent,
    AllowedLanguageComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    GeneralConfigurationComponent,
    BankComponent,
    IpsCardGroupComponent,
    ProductsComponent,
    TmsKeyComponent,
    IpsKeyComponent,
    TermKeyComponent,
    ReceiptTemplateComponent,
    SafePipe2,
    MerchantComponent,
    AttestationComponent,
    AttestationHistoryComponent,
    BackgroundJobComponent,
    AnalyticsComponent,
    MonitoringComponent,
    RegistrationComponent
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
    },
    DatePipe,
    TerminalRest,
    TransactionRest,
    MerchantRest,
    AttestationHistoryRest,
    ReceiptSendAuditRest,
    RegistrationRest
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
