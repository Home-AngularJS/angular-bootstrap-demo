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
import { dtoToTerminalMessage, MessageModel, messageNew, messageToUpdate } from '../../../core/model/message.model';
import {
  appendTitleFilter,
  clearTitleFilter,
  FilterMessageTemplate,
  filterMessageTemplateFormEmpty, getTitleFilter,
  isEmpty,
  isNotEmpty
} from '../../../core/model/message-template.model';
import { DataService } from '../../../core/service/data.service';

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
  SELECT_INPUTS = 0;
  ALL_INPUTS = 0;
  terminalMessageIds: any = [];
  title;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: TerminalMessageService) { }

  ngOnInit() {
    this.presetAppendTitle(this.SELECT_INPUTS)
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

  public onCheckedItem(item: any) {
    const terminalMessages: any = this.dtoToTerminalMessages(this.service.terminals.data)
    const messageItemName = item.target.name; // (terminalId)

    const inputs = document.getElementsByName(messageItemName)
    this.SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value') //TODO: (MessageAction.notifyAction)   messageActionName = 'terminalMessage'
      const message = inputs[i].getAttribute('id')
      for (var s = 0; s < terminalMessages.length; s++) {
        if (terminalMessages[s].notifyAction[messageActionName].value[0].checked) this.SELECT_INPUTS++
        if (terminalMessages[s].notifyAction[messageActionName].value[0].message == message) {
          if (!terminalMessages[s].notifyAction[messageActionName].value[0].checked) {
            terminalMessages[s].notifyAction[messageActionName].value[0].checked = true
            this.SELECT_INPUTS++
          } else {
            terminalMessages[s].notifyAction[messageActionName].value[0].checked = false
            this.SELECT_INPUTS--
          }
        }
        // console.log( 'messages.value = ' + JSON.stringify(terminalMessages[s].notifyAction[messageActionName].value[0]) )
      }
    }
    // console.log('SELECT_INPUTS = ' + this.SELECT_INPUTS)
    this.dataService.updateOnSubmitMessage(this.disableUpdateOnSubmitMessage())
    this.presetAppendTitle(this.SELECT_INPUTS)

    this.ALL_INPUTS = terminalMessages.length
    // console.log('ALL_INPUTS = ' + this.ALL_INPUTS)
  }

  private dtoToTerminalMessages(data: any) {
    const terminalMessageIds = [];
    const terminalMessages: any = [];
    for (let i = 0; i < data.length; i++) {
      const terminalMessage = dtoToTerminalMessage(data[i]);
      terminalMessages.push(terminalMessage);
      terminalMessageIds.push(terminalMessage.terminalId);
    }

    if (this.terminalMessageIds.toString() !== terminalMessageIds.toString()) { //TODO: Array(s) are contains
      this.terminalMessageIds = terminalMessageIds;
      this.dataService.updateTerminalMessage(terminalMessages);
    }
    return this.dataService.getTerminalMessages();
  }

  private disableUpdateOnSubmitMessage() {
    const entity = this.dtoToMessage('merchantMessage', 'terminalMessage');
    const dto = messageToUpdate(entity);
    const disabled = (isNotEmpty(dto.text) && 0 < dto.terminalIdList.length) ? true : false
    return {disabled : disabled};
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
