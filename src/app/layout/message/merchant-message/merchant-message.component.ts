import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MerchantMessageService } from '../../../core/service/merchant-message.service';
import { MerchantMessageDefaultSettings } from '../../../core/service/merchant-message-default.settings';
import {dtoToMerchantMessage, MessageModel, messageNew, messageToUpdate} from '../../../core/model/message.model';
import { DataService } from '../../../core/service/data.service';
import {isEmpty, isNotEmpty} from '../../../core/model/message-template.model';

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
  // title;
  // message: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, public dataService: DataService, private service: MerchantMessageService) { }

  ngOnInit() {
    /**
     * PROD. Profile
     */
  }

  public onCheckedItem(item: any) {
    const merchantMessages: any = this.dtoToMerchantMessages(this.service.merchants.data)
    const messageItemName = item.target.name; // (merchantId)

    const inputs = document.getElementsByName(messageItemName)
    this.SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value') //TODO: (MessageAction.notifyAction)   messageActionName = 'merchantMessage'
      const message = inputs[i].getAttribute('id')
      for (var s = 0; s < merchantMessages.length; s++) {
        if (merchantMessages[s].notifyAction[messageActionName].value[0].checked) this.SELECT_INPUTS++
        if (merchantMessages[s].notifyAction[messageActionName].value[0].message == message) {
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
    this.dataService.updateOnSubmitMessage(this.disableUpdateOnSubmitMessage())

    this.ALL_INPUTS = merchantMessages.length
    // console.log('ALL_INPUTS = ' + this.ALL_INPUTS)
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

  private disableUpdateOnSubmitMessage() {
    const entity = this.dtoToMessage('merchantMessage', 'terminalMessage');
    const _dto = messageToUpdate(entity);
    const disabled = (isNotEmpty(_dto.text) && 0 < _dto.terminalIdList.length) ? true : false
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
}
