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
  SELECT_INPUTS = 0;
  ALL_INPUTS = 0;
  merchantMessageIds: any = [];
  title;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, public dataService: DataService, private service: MerchantMessageService) { }

  ngOnInit() {
    this.presetAppendTitle(this.SELECT_INPUTS)

    /**
     * PROD. Profile
     */
  }

  public async onCheckedItem(item: any) {
    const messageItemName = item.target.name; //TODO: (merchantId)
    const inputs = document.getElementsByName(messageItemName)
    const merchantMessages: any = this.dtoToMerchantMessages(this.service.merchants.data)
    await delay(75)

    this.SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value') //TODO: (MessageAction.notifyAction)   messageActionName = 'merchantMessage'
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
    // console.log('SELECT_INPUTS = ' + this.SELECT_INPUTS)
    this.dataService.updateOnSubmitMessage(disableUpdateOnSubmitMessage(
    this.dtoToMessage('merchantMessage', 'terminalMessage')))
    this.presetAppendTitle(this.SELECT_INPUTS)

    this.ALL_INPUTS = merchantMessages.length
    // console.log('ALL_INPUTS = ' + this.ALL_INPUTS)
    const merchantMessageAll = (this.ALL_INPUTS == this.SELECT_INPUTS) ? true : false;
    this.dataService.updateMerchantMessageAll({'checked': merchantMessageAll});
  }

  /**
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public async onCheckedList(item: any) {
    const merchantMessages: any = this.dtoToMerchantMessages(this.service.merchants.data)
    await delay(75)
    const messageItemName = item.target.name; // 'merchantMessage'
    for (var m = 0; m < merchantMessages.length; m++) merchantMessages[m].notifyAction[messageItemName].value[0].checked = item.target.checked;
    this.ALL_INPUTS = merchantMessages.length;
    this.SELECT_INPUTS = item.target.checked ? this.ALL_INPUTS : 0;
  }

  private dtoToMerchantMessages(data: any) {
    const merchantMessageIds = [];
    const merchantMessages: any = [];
    for (let i = 0; i < data.length; i++) {
      const merchantMessage = dtoToMerchantMessage(data[i]);
      merchantMessages.push(merchantMessage);
      merchantMessageIds.push(merchantMessage.merchantId);
    }

    if (this.merchantMessageIds.toString() !== merchantMessageIds.toString()) { //TODO: Array(s) are contains
      this.merchantMessageIds = merchantMessageIds;
      this.dataService.updateMerchantMessage(merchantMessages);
    }
    return this.dataService.getMerchantMessages();
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
