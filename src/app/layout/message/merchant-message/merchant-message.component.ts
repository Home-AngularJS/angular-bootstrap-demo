import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MerchantMessageService } from '../../../core/service/merchant-message.service';
import { MerchantMessageDefaultSettings } from '../../../core/service/merchant-message-default.settings';
import { dtoToMerchantMessage } from '../../../core/model/message.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: MerchantMessageService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [MerchantMessageService, MerchantMessageDefaultSettings]
}];

@Component({
  selector: 'app-merchant-message',
  templateUrl: './merchant-message.component.html',
  styleUrls: ['./merchant-message.component.css'],
  providers
})
export class MerchantMessageComponent implements OnInit {
  merchants: any = [];
  merchantIds: any = [];
  merchantMenu = [
    {'messageItemName': 'merchantMenuNotify', 'checked': false}
  ]
  title;
  message: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private service: MerchantMessageService) { }

  ngOnInit() {
    /**
     * PROD. Profile
     */
  }

  // public onCheckedItem(selectedMessageItem: any, messageItemName: string, action: any, item: any) {
    // if (selectedMessageItem.notifyAction[messageItemName].value[0].messageName === action.value.messageName) selectedMessageItem.notifyAction[messageItemName].value[0].checked = item.target.checked
    // if (this.merchantMenu[0].messageItemName === item.target.name) this.isCheckedMerchantList(item.target.name)

  public onCheckedItem(selectedMessageItem: any, messageItemName: string, item: any) {
    const merchants = [];
    const merchantIds = [];
    for (let i = 0; i < this.service.merchants.data.length; i++) {
      const merchant = dtoToMerchantMessage(this.service.merchants.data[i]);
      merchants.push(merchant);
      merchantIds.push(merchant.merchantId);
    }

    if (this.merchantIds.toString() != merchantIds.toString()) {
      console.log('--- NEW ---')
      this.merchants = merchants;
      this.merchantIds = merchantIds;
    } else {
      console.log('--- OLD ---')
    }

    console.log(this.merchants)
    // if (this.merchantMenu[0].messageItemName === item.target.name)
      this.isCheckedMerchantList(item.target.name)
  }

  public isCheckedMerchantList(messageItemName: string) {
    const inputs = document.getElementsByName(messageItemName)
    let SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id')
      for (var s = 0; s < this.merchants.length; s++) {
        if (this.merchants[s].notifyAction[messageActionName].value[0].checked) SELECT_INPUTS++
        if (this.merchants[s].notifyAction[messageActionName].value[0].message == message) {
          if (!this.merchants[s].notifyAction[messageActionName].value[0].checked) {
            this.merchants[s].notifyAction[messageActionName].value[0].checked = true
            SELECT_INPUTS++
          } else {
            this.merchants[s].notifyAction[messageActionName].value[0].checked = false
            SELECT_INPUTS--
          }
        }
        console.log( 'messages.value = ' + JSON.stringify(this.merchants[s].notifyAction[messageActionName].value[0]) )
      }
    }

    console.log('SELECT_INPUTS = ' + SELECT_INPUTS)

    // const ALL_INPUTS = inputs.length
    // for (var m = 0; m < this.merchantMenu.length; m++) {
    //   if (this.merchantMenu[m].messageItemName == messageItemName) {
    //     if (0 < ALL_INPUTS && ALL_INPUTS == SELECT_INPUTS) this.merchantMenu[m].checked = true
    //     else this.merchantMenu[m].checked = false
    //   }
    // }
  }

  public onCheckedMerchantList(messageItemName: string, item: any) {
    const inputs = document.getElementsByName(messageItemName)
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id') // const message = inputs[i].id
      for (var s = 0; s < this.merchants.length; s++) {
        if (this.merchants[s].notifyAction[messageActionName].value[0].message == message) this.merchants[s].notifyAction[messageActionName].value[0].checked = item.target.checked
      }
    }
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://stackoverflow.com/questions/49194316/override-a-components-default-sass-variables-in-a-different-angular-cli-project
   * https://github.com/scttcper/ngx-toastr
   */
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 20000
    });
  }

  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

  public selectPage(select: any) {
    console.log(select)
    return parseInt(select);
  }

  public selectLastPage(length: any, size: any) {
    const _length = parseInt(length);
    const _size = parseInt(size);
    const max = _length / _size;
    const _lastPage = Math.round(max);
    return (_lastPage < max) ? _lastPage + 1 : _lastPage;
  }
}
