import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../core/service/api.service";
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public app: AppComponent) {
    this.app.setLoggedIn({'isLoggedIn':false});
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginPayload = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }

     this.apiService.login(loginPayload)
       .subscribe(data => {
        // debugger;
        // if(data.status === 200) {
        //   window.localStorage.setItem('token', data.result.token);
        console.log(data)
        const anyData: any = data
        const token = anyData.token
        window.localStorage.setItem('token', token);
        this.app.setLoggedIn({'isLoggedIn': true});
        this.router.navigate(['']); // home
        // } else {
        //   this.invalidLogin = true;
        //   alert(data.message);
        // }
         },
         error => {
           alert( JSON.stringify(error) );
         });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
