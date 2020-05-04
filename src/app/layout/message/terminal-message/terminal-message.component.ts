import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { TerminalMessageService } from '../../../core/service/terminal-message.service';
import { TerminalMessageDefaultSettings } from '../../../core/service/terminal-message-default.settings';
import { ApiService } from '../../../core/service/api.service';
import { dtoToServiceGroup } from '../../../core/model/service-group.model';
import {
  disableUpdateOnSubmitMessage,
  dtoToTerminalMessage,
  MessageModel,
  messageNew,
  messageToUpdate
} from '../../../core/model/message.model';
import {
  appendTitleFilter,
  clearTitleFilter,
  FilterMessageTemplate,
  filterMessageTemplateFormEmpty, getTitleFilter,
  isEmpty,
  isNotEmpty
} from '../../../core/model/message-template.model';
import { DataService } from '../../../core/service/data.service';

const delay = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

const providers = [{
  provide: SmartTable,
  useFactory: (service: TerminalMessageService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [TerminalMessageService, TerminalMessageDefaultSettings]
}];

@Component({
  selector: 'app-terminal-message',
  templateUrl: './terminal-message.component.html',
  styleUrls: ['./terminal-message.component.css'],
  providers
})
export class TerminalMessageComponent implements OnInit {
  serviceGroups: any = [];
  takeTerminalStatuses: any;
  title;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: TerminalMessageService) { }

  ngOnInit() {
    this.presetAppendTitle(this.dataService.messageAll.terminal.selectedInputs)
    this.takeTerminalStatuses = this.dataService.getTakeTerminalStatuses()

    /**
     * PROD. Profile
     */
    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const serviceGroups: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const serviceGroup = dtoToServiceGroup(data.content[i]);
            serviceGroups.push(serviceGroup);
          }
          this.serviceGroups = serviceGroups;
        },
        error => {
          // alert( JSON.stringify(error) );
          this.showError('Группы терииналов', JSON.stringify(error));
        });
  }

  /**
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public async onCheckedList(item: any) {
    this.dataService.messageAll.terminal.selectedInputs = 0
    const messageItemName = item.target.name; // 'terminalMessage'
    const terminalMessageAll = item.target.checked;
    const pageMessages: any = this.service.terminals.data;
    const messages: any = this.dataService.messageAll.terminal.messages

    // update checked-inputs on view-page
    this.dataService.messageAll.page.terminal.checked = terminalMessageAll;
    for (var i = 0; i < pageMessages.length; i++) pageMessages[i].checked = terminalMessageAll;
    // update checked-inputs on local-storage
    for (var i = 0; i < messages.length; i++) {
      const index = pageMessages.findIndex(pageTerminalMessage => pageTerminalMessage.terminalId === messages[i].terminalId);
      if (index !== -1) messages[i].notifyAction[messageItemName].value[0].checked = terminalMessageAll;
      if (messages[i].notifyAction[messageItemName].value[0].checked) this.dataService.messageAll.terminal.selectedInputs++;
    }

    this.presetAppendTitle(this.dataService.messageAll.terminal.selectedInputs)
    this.dataService.updateOnSubmitMessage(
      disableUpdateOnSubmitMessage(
        this.dtoToMessage('merchantMessage', 'terminalMessage')));
  }

  public async onCheckedItem(item: any) {
    let pageInputs = 0;
    this.dataService.messageAll.terminal.selectedInputs = 0
    const messageItemName = item.target.name; //TODO: (terminalId)
    const pageMessages: any = this.service.terminals.data;
    const messages: any = this.dataService.messageAll.terminal.messages
    const inputs = document.getElementsByName(messageItemName)

    // update & calculate checked-input on one
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value') //TODO: (MessageAction.notifyAction)   messageActionName = 'terminalMessage'
      this.calculateCheckedMessage(messageActionName, messageItemName, messages);
    }
    // calculate checked-inputs on page
    for (var i = 0; i < messages.length; i++) {
      const index = pageMessages.findIndex(pageTerminalMessage => pageTerminalMessage.terminalId === messages[i].terminalId);
      if ((index !== -1) && (messages[i].notifyAction['terminalMessage'].value[0].checked)) pageInputs++;
    }

    this.dataService.messageAll.page.terminal.checked = (pageMessages.length === pageInputs) ? true : false;
    this.presetAppendTitle(this.dataService.messageAll.terminal.selectedInputs)
    this.dataService.updateOnSubmitMessage(
      disableUpdateOnSubmitMessage(
        this.dtoToMessage('merchantMessage', 'terminalMessage')));
  }

  /**
   * @param messageActionName = 'terminalMessage'
   * @param messageItemName = (terminalId)
   * @param messages = Array
   */
  private calculateCheckedMessage(messageActionName, messageItemName, messages) {
    for (var s = 0; s < messages.length; s++) {
      if (messages[s].notifyAction[messageActionName].value[0].checked) this.dataService.messageAll.terminal.selectedInputs++
      if (messages[s].notifyAction[messageActionName].value[0].message === messageItemName) {
        if (!messages[s].notifyAction[messageActionName].value[0].checked) {
          messages[s].notifyAction[messageActionName].value[0].checked = true
          this.dataService.messageAll.terminal.selectedInputs++
        } else {
          messages[s].notifyAction[messageActionName].value[0].checked = false
          this.dataService.messageAll.terminal.selectedInputs--
        }
      }
      // console.log( 'messages.value = ' + JSON.stringify(messages[s].notifyAction[messageActionName].value[0]) )
    }
  }

  private dtoToMessage(messageMerchantName: any, messageTerminalName: any) {
    const messageTemplate = this.dataService.getMessageTemplate()

    const message: MessageModel = messageNew();
    message.text = messageTemplate.text;

    if (isNotEmpty(messageMerchantName)) {
      const merchantMessages = this.dataService.messageAll.merchant.messages
      for (var i = 0; i < merchantMessages.length; i++) {
        if (merchantMessages[i].notifyAction !== null) {
          const merchantMessage = merchantMessages[i].notifyAction[messageMerchantName].value[0];
          if (merchantMessage.checked) message.merchantIds.push(merchantMessage.message);
        }
      }
    }
    if (isNotEmpty(messageTerminalName)) {
      const terminalMessages = this.dataService.messageAll.terminal.messages
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
