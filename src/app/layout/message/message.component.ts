import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

const delay = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

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
  messageConfirmForm: FormGroup;
  showCloseIcon: Boolean = true;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('messageConfirm') messageConfirm: DialogComponent;
  isModalMessageConfirm: Boolean = false;
  title;
  merchantLength = 0;
  terminalLength = 0;
  message2 = 'message.confirm.text-2-0';
  t = 1588576528675; // TODO: refresh time  (one-static) only Odd Number
  ts: number[] = [1588576365718, 1588576332316, 1588576994782, 1588577875232]; // TODO: refresh time (all-another) only Even Number

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, @Inject(TranslateService) private translateService: TranslateService, private http: HttpClient, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * @see @see https://habr.com/ru/post/132654
     */
    setTimeout(() => {
      this.pageReset();
      this.pageRefresh();
    });

    /**
     * @see https://embed.plnkr.co/plunk/I0J0Zi
     *      https://angular-templates.io/tutorials/about/angular-forms-and-validations
     *      https://regex101.com/r/kb2Jh1/2
     */
    this.messageConfirmForm = this.formBuilder.group({
      // id: [''],
      // text: ['', Validators.required],
      // text: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      // validator: MustMatch('password', 'confirmPassword')
    });

    this.route
      .queryParams
      .subscribe(params => {
        // const filter: FilterMessageTemplate = filterMessageTemplateFormEmpty();
        // const id = params['id'];
        // if (isNotEmpty(id)) filter.id = id;
        // this.appendTitle(filter);
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
      timeOut: 500000
    });
  }

  public onMessage() { // open
    const entity = this.dtoToMessage('merchantMessage', 'terminalMessage');
    console.log(entity)
    const dto = messageToUpdate(entity);

    this.apiService.sendMessage(dto)
      .pipe(first())
      .subscribe(
        data => {
          this.merchantLength = dto.merchantIdList.length;
          this.terminalLength = dto.terminalIdList.length;
          if (0 < dto.merchantIdList.length && 0 < dto.terminalIdList.length) this.message2 = 'message.confirm.text-2-1';
          if (0 < dto.merchantIdList.length && 0 === dto.terminalIdList.length) this.message2 = 'message.confirm.text-2-2';
          if (0 === dto.merchantIdList.length && 0 < dto.terminalIdList.length) this.message2 = 'message.confirm.text-2-3';
          this.showSuccess('Отправить уведомления', 'последняя успешная отправка ' + this.dataService.moment(this.translateService.currentLang).format('dddd, MMMM DD YYYY, H:mm:ss'));

          // this.showInfo('Отправить уведомления', 'последняя успешная отправка ' + this.dataService.moment(this.translateService.currentLang).format('dddd, MMMM DD YYYY, H:mm:ss')); //TODO:  @see https://habr.com/ru/post/132654
          document.getElementById('messageConfirm').style.display = 'block';
          this.isModalMessageConfirm = true;
          this.messageConfirm.show();
        },
        error => {
          this.showError('Отправить уведомления', 'Неуспешная отправка');
        });
  }

  public onMessageConfirm: EmitType<object> = () => {
    // do Confirm:
    document.getElementById('btnApplyMessageConfirm').onclick = (): void => {
      this.message2 = 'message.confirm.text-2-0';;

      this.messageConfirm.hide();
    };
  }

  public offMessageConfirm: EmitType<object> = () => {
    this.message2 = 'message.confirm.text-2-0';;
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
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  public goBack() {
    // window.history.back();
    this.location.back();
  }

  private pageReset() {
    this.dataService.messageAll.merchant.title = '';
    this.dataService.messageAll.merchant.allInputs = 0;
    this.dataService.messageAll.merchant.selectedInputs = 0;
    this.dataService.messageAll.merchant.messages = [];
    this.dataService.messageAll.terminal.title = '';
    this.dataService.messageAll.terminal.allInputs = 0;
    this.dataService.messageAll.terminal.selectedInputs = 0;
    this.dataService.messageAll.terminal.messages = [];
    this.dataService.messageAll.page.merchant.checked = false;
    this.dataService.messageAll.page.terminal.checked = false;

    this.dataService.updateMessageTemplate({text: ''});
    this.dataService.updateMerchantMessage([]);
    this.dataService.updateTerminalMessage([]);
    this.dataService.updateOnSubmitMessage({'disabled': false});
  }


  /**
   * @see https://metanit.com/web/angular2/7.3.php
   *      https://proweb63.ru/help/angular/angular-fw-book/ng-route
   *      https://bxnotes.ru/conspect/lib/angular/angular-5-the-complete-guide/route-chast-2
   *      https://www.sitepoint.com/component-routing-angular-router
   */
  public async pageRefresh() {
    let t = this.ts[Math.floor(Math.random() * this.ts.length)];
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('t'))
    ).subscribe(data => {
      const isEvenNumber = num => (num % 2) ? num : t;
      t = isEvenNumber(this.t);
    });
    this.t = t;
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
