import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MerchantMessageService } from '../../../core/service/merchant-message.service';
import { MerchantMessageDefaultSettings } from '../../../core/service/merchant-message-default.settings';
import {
  disableUpdateOnSubmitMessage,
  dtoToMerchantMessage,
  MessageModel,
  messageNew,
  messageToUpdate
} from '../../../core/model/message.model';
import {
  appendTitleFilter,
  clearTitleFilter,
  FilterMessageTemplate,
  filterMessageTemplateFormEmpty,
  getTitleFilter,
  isNotEmpty
} from '../../../core/model/message-template.model';
import { DataService } from '../../../core/service/data.service';
import {FormGroup} from '@angular/forms';

/**
 * @see https://metanit.com/web/angular2/2.8.php
 */

const delay = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

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
  merchantMessageAll = false;
  SELECT_INPUTS = 0;
  title;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, public dataService: DataService, private service: MerchantMessageService) { }

  ngOnInit() {
    this.presetAppendTitle(this.SELECT_INPUTS)

    /**
     * PROD. Profile
     */
  }

  public async onCheckedItem(item: any) {
    const pageMerchantMessages: any = this.service.merchants.data;
    const merchantMessages: any = this.dataService.getMerchantMessages()
    const messageItemName = item.target.name; //TODO: (merchantId)
    const inputs = document.getElementsByName(messageItemName)

    this.SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value') //TODO: (MessageAction.notifyAction)   messageActionName = 'merchantMessage'
      this.calculateCheckedMessage(messageActionName, messageItemName, merchantMessages);
    }
    this.presetAppendTitle(this.SELECT_INPUTS)
    this.dataService.updateOnSubmitMessage(
      disableUpdateOnSubmitMessage(
        this.dtoToMessage('merchantMessage', 'terminalMessage')))

    let pageInputs = 0;
    for (var m = 0; m < merchantMessages.length; m++) {
      const index = pageMerchantMessages.findIndex(pageMerchantMessage => pageMerchantMessage.merchantId === merchantMessages[m].merchantId);
      if ((index !== -1) && (merchantMessages[m].notifyAction['merchantMessage'].value[0].checked)) pageInputs++
    }
    const merchantMessageAll = (pageMerchantMessages.length === pageInputs) ? true : false;
    this.dataService.pageMessageAll.merchant.checked = merchantMessageAll;
  }

  /**
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public async onCheckedList(item: any) {
    const pageMerchantMessages: any = this.service.merchants.data;
    let merchantMessages: any = this.dataService.getMerchantMessages()
    const messageItemName = item.target.name; // 'merchantMessage'

    // update checked-inputs on page
    const merchantMessageAll = item.target.checked;
    this.dataService.pageMessageAll.merchant.checked = merchantMessageAll;
    for (var i = 0; i < pageMerchantMessages.length; i++) pageMerchantMessages[i].checked = merchantMessageAll;
    // update checked-inputs on local-storage
    for (var i = 0; i < merchantMessages.length; i++) {
      const index = pageMerchantMessages.findIndex(pageMerchantMessage => pageMerchantMessage.merchantId === merchantMessages[i].merchantId);
      if (index !== -1) merchantMessages[i].notifyAction[messageItemName].value[0].checked = merchantMessageAll;
    }

    this.SELECT_INPUTS = 0
    merchantMessages = this.dataService.getMerchantMessages()
    for (var i = 0; i < merchantMessages.length; i++) if (merchantMessages[i].notifyAction[messageItemName].value[0].checked) this.SELECT_INPUTS++

    this.presetAppendTitle(this.SELECT_INPUTS)
    this.dataService.updateOnSubmitMessage(
      disableUpdateOnSubmitMessage(
        this.dtoToMessage('merchantMessage', 'terminalMessage')))

    // window.location.reload()
    // this.router.navigateByUrl('/message/merchant-message');
    // this.router.navigateByUrl('message/merchant-message');
    // this.router.navigateByUrl('/merchant-message');
    // this.router.navigateByUrl('merchant-message');
  }

  /**
   * @param messageActionName = 'merchantMessage'
   * @param messageItemName = (merchantId)
   * @param merchantMessages = Array
   */
  private calculateCheckedMessage(messageActionName, messageItemName, merchantMessages) {
    for (var s = 0; s < merchantMessages.length; s++) {
      if (merchantMessages[s].notifyAction[messageActionName].value[0].checked) this.SELECT_INPUTS++
      if (merchantMessages[s].notifyAction[messageActionName].value[0].message === messageItemName) {
        if (!merchantMessages[s].notifyAction[messageActionName].value[0].checked) {
          merchantMessages[s].notifyAction[messageActionName].value[0].checked = true
          this.SELECT_INPUTS++
        } else {
          merchantMessages[s].notifyAction[messageActionName].value[0].checked = false
          this.SELECT_INPUTS--
        }
      }
      // console.log( 'messages.value = ' + JSON.stringify(merchantMessages[s].notifyAction[messageActionName].value[0]) )
    }
  }

  private dtoToMessage(messageMerchantName: any, messageTerminalName: any) {
    const messageTemplate = this.dataService.getMessageTemplate()

    const message: MessageModel = messageNew();
    message.text = messageTemplate.text;

    if (isNotEmpty(messageMerchantName)) {
      const merchantMessages = this.dataService.getMerchantMessages()
      for (var i = 0; i < merchantMessages.length; i++) {
        if (merchantMessages[i].notifyAction !== null) {
          const merchantMessage = merchantMessages[i].notifyAction[messageMerchantName].value[0];
          if (merchantMessage.checked) message.merchantIds.push(merchantMessage.message);
        }
      }
    }
    if (isNotEmpty(messageTerminalName)) {
      const terminalMessages = this.dataService.getTerminalMessages()
      for (var i = 0; i < terminalMessages.length; i++) {
        if (terminalMessages[i].notifyAction !== null) {
          const terminalMessage = terminalMessages[i].notifyAction[messageTerminalName].value[0];
          if (terminalMessage.checked) message.terminalIds.push(terminalMessage.message);
        }
      }
    }

    return message;
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

  /**
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
   */
  public presetAppendTitle(val) {
    let merchantNotify = 0;
    const filter: FilterMessageTemplate = filterMessageTemplateFormEmpty();
    if (typeof val === "number") merchantNotify = val;
    filter.text = merchantNotify.toString();
    this.appendTitle(filter);
    return merchantNotify;
  }

  public appendTitle(val) {
    if (isNotEmpty(val.field)) { // if (typeof val === "string") {
      // this.appendTitleByString(val);
    } else { // if (typeof val === "object") {
      clearTitleFilter();
      this.appendTitleByObject(val);
    }
    this.title = getTitleFilter();
  }

  public clearTitle() {
    filterMessageTemplateFormEmpty();
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByObject(filter: FilterMessageTemplate) {
    appendTitleFilter(filter.id);
    appendTitleFilter(filter.text);
  }
}
