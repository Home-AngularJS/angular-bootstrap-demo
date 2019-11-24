import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {allReceiptNumbers, receiptTemplates, selectedReceiptNumber} from './core/model/transaction.model';
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

  constructor(private router: Router, private apiService: ApiService) {
    console.log('>>>>>>>>>>>>>>>> app.component | constructor')
    console.log( allReceiptNumbers[3] );
    // allReceiptNumbers[3].templateStyle = allReceiptNumbers[1].templateStyle;
    // allReceiptNumbers[3].templateBody = allReceiptNumbers[1].templateBody;
    // // allReceiptNumbers[3].templateBody = '<style>' + allReceiptNumbers[1].templateStyle + '</style>' + allReceiptNumbers[1].templateBody;
  }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    console.log('>>>>>>>>>>>>>>>> app.component | ngOnInit')
    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const entity: any = dtoToReceiptTemplate(data.content[i]);
            receiptTemplates.push(entity);
          }
          selectedReceiptNumber.id = receiptTemplates[1].id;
          selectedReceiptNumber.templateName = receiptTemplates[1].templateName;
          selectedReceiptNumber.templateStyle = receiptTemplates[1].templateStyle;
          selectedReceiptNumber.templateBody = receiptTemplates[1].templateBody;
          console.log( selectedReceiptNumber );
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  public loadReceiptNumberStyle(item: any) {
    console.log('>>>>>>>>>>>>>>>> app.component | loadReceiptNumberStyle')
    // this.apiService.findReceiptTemplateByTemplateId(2)
    //   .subscribe( data => {
    //       // console.log(data)
    //       var entity: any = dtoToReceiptTemplate(data);
    //       if (entity.templateStyle!=selectedReceiptNumber.templateStyle) selectedReceiptNumber.templateStyle = entity.templateStyle;
    //     },
    //     error => {
    //       alert( JSON.stringify(error) );
    //     });
    // allReceiptNumbers[3].templateStyle = allReceiptNumbers[1].templateStyle;
  }

  public getIsLoggedIn(): { isLoggedIn } {
    return this.isLoggedIn;
  }

  public setLoggedIn(isLoggedIn: { isLoggedIn }) {
    this.isLoggedIn = isLoggedIn.isLoggedIn;
  }
}
