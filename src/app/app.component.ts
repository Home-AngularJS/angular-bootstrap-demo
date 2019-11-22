import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectedReceiptNumber } from './core/model/transaction.model';
import { dtoToReceiptTemplate } from './core/model/receipt-template.model';
import { ApiService } from './core/service/api.service';

/**
 * https://samvloeberghs.be/posts/scroll-to-top-on-angular-router-navigation
 * https://dev.to/angular/scroll-to-top-on-angular-router-navigation-1iha
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = {'isLoggedIn':false};

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
  }

  public loadReceiptNumberStyle(item: any) {
    this.apiService.findReceiptTemplateByTemplateId(2)
      .subscribe( data => {
          // console.log(data)
          var entity: any = dtoToReceiptTemplate(data);
          if (entity.templateStyle!=selectedReceiptNumber.templateStyle) selectedReceiptNumber.templateStyle = entity.templateStyle;
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  public getIsLoggedIn(): { isLoggedIn } {
    return this.isLoggedIn;
  }

  public setLoggedIn(isLoggedIn: { isLoggedIn }) {
    this.isLoggedIn = isLoggedIn.isLoggedIn;
  }
}
