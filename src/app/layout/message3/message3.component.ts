import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {
  appendTitleFilter,
  clearTitleFilter,
  FilterMessage,
  filterMessageFormEmpty,
  getBtnFilter,
  getTitleFilter,
  isNotEmpty, newMessage, registerNewMessage
} from '../../core/model/message.model';
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
// import { UserService } from '../../core/service/message.service';
// import { MessageDefaultSettings } from '../../core/service/message-default.settings';

// const providers = [{
//   provide: SmartTable,
//   useFactory: (service: UserService, settings: TableState) => of([], settings, server({
//     query: (tableState) => service.query(tableState)
//   })),
//   deps: [UserService, MessageDefaultSettings]
// }];

@Component({
  selector: 'app-message3',
  templateUrl: './message3.component.html',
  styleUrls: ['./message3.component.css'],
  // providers
})
export class Message3Component implements OnInit {
  createForm: FormGroup;
  createSubmittedForm = false;
  isButtonSave: Boolean = false;
  showCloseIcon: Boolean = true;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('create') create: DialogComponent;
  isModalCreate: Boolean = false;
  title;
  message: string = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location, private toastr: ToastrService, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * @see https://embed.plnkr.co/plunk/I0J0Zi
     *      https://angular-templates.io/tutorials/about/angular-forms-and-validations
     *      https://regex101.com/r/kb2Jh1/2
     */
    this.createForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleCode: [''],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterMessage = filterMessageFormEmpty();
        const username = params['username'];
        if (isNotEmpty(username)) filter.username = username;
        this.appendTitle(filter);
      });

    /**
     * PROD. Profile
     */
  }

  // удобство для получения быстрого доступа к полям формы
  get getCreateForm() {
    this.clearValidatorCreateForm()
    return this.createForm.controls;
  }

  public clearValidatorCreateForm() {
    // const entity = this.createForm.value;
    // if (entity.userLogin!=null
    //     && entity.merchantName!=null
    //     && entity.merchantLegalName!=null
    //     && entity.userPassword!=null
    //     && entity.confirmUserPassword!=null
    //     && entity.merchantId!=null
    //     && entity.terminalId!=null
    //     && entity.groupNumber!=null
    //     && entity.taxId!=null
    //     && entity.bankId!=null
    //     && entity.mcc!=null
    //     && entity.merchantLocation!=null
    //     && entity.latitude!=null
    //     && entity.longitude!=null
    //     && entity.phoneNumber!=null
    //     && entity.radius!=null)
    this.isButtonSave = true //this.isButtonSave = this.createForm.valid ? true : false
    // else
    //   this.isButtonSave = false
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

  public openOneCreate() {
    this.createForm.setValue(newMessage());

    document.getElementById('create').style.display = 'block';
    this.isModalCreate = true;
    this.create.show();
  }

  public onCreate: EmitType<object> = () => {
    // do Create:
    document.getElementById('btnApplyCreate').onclick = (): void => {
      this.createSubmittedForm = true;
      if (this.createForm.invalid) return; // stop here if form is invalid

      const entity = this.createForm.value;
      const dto = registerNewMessage(entity);
      console.log(dto)
      this.apiService.registerNewUser(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.create.hide();
            this.showSuccess('Сохранить', 'Создать новый шаблон');
            this.router.navigate(['message3']);
            this.showSuccess('Обновить', 'Уведомления');
            this.createSubmittedForm = false;
            this.isButtonSave = false;
          },
          error => {
            this.showError('Сохранить', 'Создать новый шаблон');
          });
    };

    // cancel:
    document.getElementById('btnCancelCreate').onclick = (): void => {
      this.createSubmittedForm = false;
      this.isButtonSave = false;
      this.create.hide();
    };
  }

  public offCreate: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  // public btnFilter(filter: any) {
  //   this.clearTitle();
  //   const filters = filter.split('&');
  //   for (let f = 0; f < filters.length; f++) {
  //     const _filter = getBtnFilter(filters[f]);
  //     this.appendTitle(_filter);
  //   }
  //   return filter;
  // }

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
    filterMessageFormEmpty();
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByObject(filter: FilterMessage) {
    appendTitleFilter(filter.username);
    appendTitleFilter(filter.email);
  }
}
