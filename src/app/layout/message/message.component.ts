import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  appendTitleFilter,
  clearTitleFilter,
  FilterMessageTemplate,
  filterMessageTemplateFormEmpty,
  getBtnFilter,
  getTitleFilter,
  newMessageTemplate, createNewMessageTemplate
} from '../../core/model/message-template.model';
// import { of, SmartTable, TableState } from 'smart-table-ng';
// import server from 'smart-table-server';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { MustMatch } from '../../core/helpers/must-match.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../core/service/api.service';
import { EmitType } from '@syncfusion/ej2-base';
import { first } from 'rxjs/operators';
import { DataService } from '../../core/service/data.service';
import { isNotEmpty, MessageModel, messageNew, messageToUpdate } from '../../core/model/message.model';
// import { MessageTemplateService } from '../../core/service/message-template.service';
// import { MessageTemplateDefaultSettings } from '../../core/service/message-template-default.settings';

// const providers = [{
//   provide: SmartTable,
//   useFactory: (service: MessageTemplateService, settings: TableState) => of([], settings, server({
//     query: (tableState) => service.query(tableState)
//   })),
//   deps: [MessageTemplateService, MessageTemplateDefaultSettings]
// }];

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  // providers
})
export class MessageComponent implements OnInit {
  title;
  message: string = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterMessageTemplate = filterMessageTemplateFormEmpty();
        const id = params['id'];
        if (isNotEmpty(id)) filter.id = id;
        this.appendTitle(filter);
      });

    /**
     * PROD. Profile
     */
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

  public onCreate() {
    // do Create:
    const entity = this.dataService.getMessageTemplate()
    const dto = createNewMessageTemplate(entity);
    this.apiService.createMessageTemplate(dto)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess('Сохранить', 'Создать новый шаблон уведомления');
          this.dataService.updateOnCreateTemplateMessage({disabled : false});
          this.router.navigate(['message']);
          // this.showSuccess('Обновить', 'Уведомления');
        },
        error => {
          this.showError('Сохранить', 'Создать новый шаблон уведомления');
        });
  }

  public onSubmit() {
    const entity = this.dtoToMessage('merchantMessage', 'terminalMessage');
    console.log(entity)
    const dto = messageToUpdate(entity);

    this.apiService.sendMessage(dto)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess('Уведомлять', 'Push-уведомления для Терминалов');
          this.router.navigate(['message']);
        },
        error => {
          this.showError('Уведомлять', 'Push-уведомления для Терминалов');
        });
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
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  public goBack() {
    // window.history.back();
    this.location.back();
  }

  public btnFilter(filter: any) {
    this.clearTitle();
    const filters = filter.split('&');
    for (let f = 0; f < filters.length; f++) {
      const _filter = getBtnFilter(filters[f]);
      this.appendTitle(_filter);
    }
    return filter;
  }

  /**
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
   */
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
