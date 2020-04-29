import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import {
  appendTitleFilter,
  clearTitleFilter, FilterMessageTemplate,
  filterMessageTemplateFormEmpty,
  getTitleFilter, getTitleFilterSeparator,
  isEmpty,
  isNotEmpty
} from '../../../core/model/message-template.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MessageTemplateService } from '../../../core/service/message-template.service';
import { MessageTemplateDefaultSettings } from '../../../core/service/message-template-default.settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../core/service/api.service';
import { DataService } from '../../../core/service/data.service';
import { MessageModel, messageNew, messageToUpdate } from '../../../core/model/message.model';

const delay = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

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
  TEXT_MAX_LENGTH = 250;
  @Input() text: any = ''
  oldText: any = ''

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

  public async selectMessageTemplate(entity) {
    console.log(entity);
    if (entity != null) {
      this.selectedMessageTemplate = entity;
      this.editForm.setValue(entity);

      await delay(100);
      this.dataService.updateOnCreateTemplateMessage({disabled : false});
    }
  }

  public selectMessageTemplateId(messageTemplate) {
    if (this.selectedMessageTemplateId === messageTemplate.id) {
      this.selectMessageTemplate(messageTemplate);
    } else {
      this.selectedMessageTemplateId = messageTemplate.id;
    }
  }

  private disableUpdateOnCreateTemplateMessage(textLength: number) {
    const disabled = (textLength < this.TEXT_MAX_LENGTH) ? true : false
    return {disabled : disabled};
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

  /**
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
   * @see https://xsltdev.ru/angular/tutorial/possible-errors/
   */
  public appendText() {
    let textLength = this.TEXT_MAX_LENGTH

    if (isNotEmpty(this.text)) {
      textLength = this.TEXT_MAX_LENGTH - this.text.length;
      if (textLength < 0) {
        textLength = 0;
        setTimeout(() => this.text = this.text.substring(0, this.TEXT_MAX_LENGTH));
      }

      if (this.oldText !== this.text) {
        this.oldText = this.text;
        setTimeout(() => this.updateMessage({'text': this.text}, textLength));
      }
    } else {
      if (this.oldText !== this.text) {
        this.oldText = this.text;
        setTimeout(() => this.updateMessage({'text': this.text}, textLength));
      }
    }

    return getTitleFilterSeparator() + textLength + ' символ(ов)';
  }

  private updateMessage(messageTemplate, textLength) {
    this.dataService.updateMessageTemplate(messageTemplate);
    this.dataService.updateOnSubmitMessage(this.disableUpdateOnSubmitMessage());
    this.dataService.updateOnCreateTemplateMessage(this.disableUpdateOnCreateTemplateMessage(textLength));
  }
}
