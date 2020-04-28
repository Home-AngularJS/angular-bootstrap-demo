import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty, isNotEmpty } from '../../../core/model/message-template.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MessageTemplateService } from '../../../core/service/message-template.service';
import { MessageTemplateDefaultSettings } from '../../../core/service/message-template-default.settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../core/service/api.service';
import { DataService } from '../../../core/service/data.service';
import {MessageModel, messageNew, messageToUpdate} from '../../../core/model/message.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: MessageTemplateService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [MessageTemplateService, MessageTemplateDefaultSettings]
}];

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css'],
  providers
})
export class MessageTemplateComponent implements OnInit {
  selectedMessageTemplate;
  selectedMessageTemplateId;
  editForm: FormGroup;
  textLength = 256;
  title;
  message: string = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: MessageTemplateService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      text: [''],
      shortText: [''],
      isShortText: ['']
    });

    /**
     * PROD. Profile
     */
  }

  public onChangeButtonSave(item: any) {
    const entity = this.editForm.value;
    console.log(entity);
    if (entity != null) {
      const TEXT_MIN_LENGTH = 0;
      const TEXT_MAX_LENGTH = 256;
      this.textLength = isNotEmpty(entity.text) ? (TEXT_MAX_LENGTH - entity.text.length) : TEXT_MAX_LENGTH;
      if (this.textLength <= 0) {
        entity.text = entity.text.substring(0, TEXT_MAX_LENGTH);
        this.textLength = TEXT_MIN_LENGTH;
      }
      this.editForm.setValue(entity);

      this.dataService.updateMessageTemplate(entity);
      this.dataService.updateOnSubmitMessage(this.disableUpdateOnSubmitMessage());
    }
  }

  public selectMessageTemplate(messageTemplate) {
    console.log(messageTemplate);
    this.selectedMessageTemplate = messageTemplate;
    if (messageTemplate != null) {
      const TEXT_MIN_LENGTH = 0;
      const TEXT_MAX_LENGTH = 256;
      this.textLength = isNotEmpty(messageTemplate.text) ? (TEXT_MAX_LENGTH - messageTemplate.text.length) : TEXT_MAX_LENGTH;
      if (this.textLength <= 0) {
        messageTemplate.text = messageTemplate.text.substring(0, TEXT_MAX_LENGTH);
        this.textLength = TEXT_MIN_LENGTH;
      }
      this.editForm.setValue(messageTemplate);

      this.dataService.updateMessageTemplate(messageTemplate);
      this.dataService.updateOnSubmitMessage(this.disableUpdateOnSubmitMessage());
    }
  }

  public selectMessageTemplateId(messageTemplate) {
    if (this.selectedMessageTemplateId === messageTemplate.id) {
      this.selectMessageTemplate(messageTemplate);
    } else {
      this.selectedMessageTemplateId = messageTemplate.id;
    }
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

  public onSubmitDelete(messageTemplateId: any) {
    this.apiService.deleteMessageTemplate(messageTemplateId)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess(messageTemplateId, 'Удалить');
          // this.pageRefresh(); // updated successfully.
        },
        error => {
          this.showError(messageTemplateId, 'Удалить');
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
