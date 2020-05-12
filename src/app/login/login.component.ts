import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../core/service/api.service';
import { AppComponent } from '../app.component';
import { DataService } from '../core/service/data.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin = false;
  loading = false;
  homeUrl = '/';
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public dataService: DataService, private apiService: ApiService, public app: AppComponent) {
    app.username = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('usergrants');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });

    // получить URL возврата из параметров маршрута или по умолчанию
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.homeUrl;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }
    this.loading = true;

    /**
     * @see https://onthecode.co.uk/decode-json-web-tokens-jwt-angular
     *      https://jwt.io
     *
     * sub: sasha
     * exp: 1588985325
     * iat: 1588967325
     * scopes: ANALYTICS_CREATE,ANALYTICS_UPDATE,ANALYTICS_VIEW,APPLICATION_LANGUAGES_CREATE,APPLICATION_LANGUAGES_UPDATE,APPLICATION_LANGUAGES_VIEW,ATTESTATION_HISTORY_CREATE,ATTESTATION_HISTORY_UPDATE,ATTESTATION_HISTORY_VIEW,ATTESTATION_PARAMETERS_CREATE,ATTESTATION_PARAMETERS_UPDATE,ATTESTATION_PARAMETERS_VIEW,BANK_CREATE,BANK_UPDATE,BANK_VIEW,GENERAL_SETTINGS_CREATE,GENERAL_SETTINGS_UPDATE,GENERAL_SETTINGS_VIEW,MERCHANT_CREATE,MERCHANT_UPDATE,MERCHANT_VIEW,MESSAGE_CREATE,MESSAGE_UPDATE,MESSAGE_VIEW,MONITORING_CREATE,MONITORING_UPDATE,MONITORING_VIEW,PAYMENT_SYSTEMS_CREATE,PAYMENT_SYSTEMS_UPDATE,PAYMENT_SYSTEMS_VIEW,PAYMENT_SYSTEM_KEYS_CREATE,PAYMENT_SYSTEM_KEYS_UPDATE,PAYMENT_SYSTEM_KEYS_VIEW,PRODUCTS_CREATE,PRODUCTS_UPDATE,PRODUCTS_VIEW,RECEIPT_REQUESTS_CREATE,RECEIPT_REQUESTS_UPDATE,RECEIPT_REQUESTS_VIEW,RECEIPT_TEMPLATE_CREATE,RECEIPT_TEMPLATE_UPDATE,RECEIPT_TEMPLATE_VIEW,REGISTRATION_CREATE,REGISTRATION_UPDATE,REGISTRATION_VIEW,ROLE_CREATE,ROLE_UPDATE,ROLE_VIEW,SCHEDULE_CREATE,SCHEDULE_UPDATE,SCHEDULE_VIEW,SYSTEM_KEYS_CREATE,SYSTEM_KEYS_UPDATE,SYSTEM_KEYS_VIEW,TERMINAL_CREATE,TERMINAL_GROUPS_CREATE,TERMINAL_GROUPS_UPDATE,TERMINAL_GROUPS_VIEW,TERMINAL_KEYS_CREATE,TERMINAL_KEYS_UPDATE,TERMINAL_KEYS_VIEW,TERMINAL_UPDATE,TERMINAL_VIEW,TRANSACTIONS_CREATE,TRANSACTIONS_UPDATE,TRANSACTIONS_VIEW,USER_CREATE,USER_UPDATE,USER_VIEW
     */
     this.apiService.login(loginPayload)
       .subscribe(data => {
         console.log(data);
         const anyData: any = data;
         const token = anyData.token;

         window.localStorage.setItem('token', token);
         this.app.username = loginPayload.username;
         window.localStorage.setItem('username', loginPayload.username);
         const decodedToken: any = jwt_decode(token);
         if (this.isNotEmpty(decodedToken.scopes)) window.localStorage.setItem('usergrants', decodedToken.scopes);
         this.router.navigate([this.returnUrl]);
       },
         error => {
         console.log( JSON.stringify(error) );
         this.loading = false;
         this.router.navigate([this.returnUrl]);
       });
  }

  private isNotEmpty(val) {
    return !this.isEmpty(val);
  }

  private isEmpty(val) {
    return (val === null || val === undefined || val === '') ? true : false;
  }

}
