import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
  FilterRegistration,
  FilterFieldValue,
  appendTitleFilter,
  clearTitleFilter,
  filterRegistrationFormEmpty,
  getBtnFilter,
  getTitleFilter,
  isNotEmpty,
  registrationToDto,
  registrationNew
} from '../../core/model/registration.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { RegistrationService } from '../../core/service/registration.service';
import { RegistrationDefaultSettings } from '../../core/service/registration-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { MustMatch } from '../../core/helpers/must-match.validator';
import { dtoToServiceGroup } from '../../core/model/service-group.model';
import {dtoToBank} from '../../core/model/bank.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: RegistrationService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [RegistrationService, RegistrationDefaultSettings]
}];

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers
})
export class RegistrationComponent implements OnInit {
  serviceGroups: any = [];
  banks: any = [];
  selectedRegistration;
  selectedRegistrationId;
  filterForm: FormGroup;
  editForm: FormGroup;
  createForm: FormGroup;
  createSubmittedForm = false;
  isButtonSave: Boolean = false;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('edit') edit: DialogComponent;
  isModalEdit: Boolean = false;
  @ViewChild('create') create: DialogComponent;
  isModalCreate: Boolean = false;
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: RegistrationService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.filterForm = this.formBuilder.group({
      id: [''],
      userLogin: [''],
      merchantId: [''],
      phoneNumber: [''],
      mcc: [''],
      merchantLocation: [''],
      merchantName: [''],
      startRegistrationDate: [''],
      endRegistrationDate: ['']
    });

    this.createForm = this.formBuilder.group({
      userLogin: ['', Validators.required],
      merchantName: ['', Validators.required],
      merchantLegalName: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmUserPassword: ['', Validators.required],
      merchantId: ['', Validators.required],
      terminalId: ['', Validators.required],
      groupNumber: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      taxId: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10), Validators.pattern(/^[0-9]\d*$/)]],
      bankId: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      mcc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^[0-9]\d*$/)]],
      merchantLocation: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,6})?$')]],
      longitude: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,6})?$')]],
      radius: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    }, {
      validator: MustMatch('userPassword', 'confirmUserPassword')
    });

    this.editForm = this.formBuilder.group({
      id: [''],
      mcc: [''],
      merchantId: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      phoneNumber: [''],
      registrationDate: [''],
      taxId: [''],
      terminalId: [''],
      userLogin: [''],
      groupNumber: [''],
      bankId: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterRegistration = filterRegistrationFormEmpty();
        const merchantId = params['merchantId'];
        if (isNotEmpty(merchantId)) filter.merchantId = merchantId;
        this.appendTitle(filter);
      });

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
          // this.showError('Обновить', 'Группы Терминалов');
        });

    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            this.banks.push(dtoToBank(data.content[i]));
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
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
    //     && entity.radius!=null)
      this.isButtonSave = true //this.isButtonSave = this.createForm.valid ? true : false
    // else
    //   this.isButtonSave = false
  }

  public selectRegistration(registration) {
    console.log(registration);
    this.selectedRegistration = registration;
    if (registration != null) this.openEdit(registration);
  }

  public selectRegistrationId(registration) {
    if (this.selectedRegistrationId === registration.id) {
      this.selectRegistration(registration);
    } else {
      this.selectedRegistrationId = registration.id;
    }
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

  public openFilter: EmitType<object> = () => {
    this.filterForm.setValue(this.service.filter);

    document.getElementById('filter').style.display = 'block';
    this.isModalFilter = true;
    this.filter.show();
  }

  public onFilter: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      const filter: FilterRegistration = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterRegistrationFormEmpty());
      this.clearTitle();
      this.router.navigate(['registration']); //TODO: ???
      this.showSuccess('Сбросить', 'Фильтр');
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public openCreate() {
    this.createForm.setValue(registrationNew());

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
      this.showSuccess('Сохранить', 'Предварительная регистрация торговцев');
      const dto = registrationToDto(entity);
      console.log(dto)
      this.apiService.registerTerminalData(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.create.hide();
            this.showSuccess('Сохранить', 'Предварительная регистрация торговцев');
            this.router.navigate(['registration']);
            this.showSuccess('Обновить', 'Предварительная регистрация торговцев');
            this.createSubmittedForm = false;
          },
          error => {
            this.showError('Сохранить', 'Предварительная регистрация торговцев');
          });
    };

    // cancel:
    document.getElementById('btnCancelCreate').onclick = (): void => {
      this.createSubmittedForm = false;
      this.create.hide();
    };
  }

  public offCreate: EmitType<object> = () => {
  }

  public openEdit(registration) {
    this.editForm.setValue(registration);

    document.getElementById('edit').style.display = 'block';
    this.isModalEdit = true;
    this.edit.show();
  }

  public onEdit: EmitType<object> = () => {
    // do Edit:
    // document.getElementById('btnApplyEdit').onclick = (): void => {
    //   const dto = registrationToDto(this.editForm.value);
    //   this.apiService.updateTerminalData(dto.id, dto)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //         this.edit.hide();
    //         this.showSuccess('Сохранить', dto.id);
    //         this.router.navigate(['registration']); //TODO: ???
    //         this.showSuccess('Обновить', 'Предварительная регистрация торговцев');
    //       },
    //       error => {
    //         this.showError('Сохранить', dto.merchantId);
    //       });
    // };

    // cancel:
    document.getElementById('btnCancelEdit').onclick = (): void => {
      this.edit.hide();
    };
  }

  public offEdit: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
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
  public appendTitle(val) {
    if (isNotEmpty(val.field)) { // if (typeof val === "string") {
      const filter = this.appendTitleByString(val);
      this.filterForm.setValue(filter);
    } else { // if (typeof val === "object") {
      clearTitleFilter();
      this.appendTitleByObject(val);
      this.filterForm.setValue(val);
    }
    this.title = getTitleFilter();
  }

  public clearTitle() {
    const filter: FilterRegistration = filterRegistrationFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterRegistration = this.filterForm.value;
    if (fieldValue.field.indexOf('id') !== -1 && isNotEmpty(fieldValue.value)) filter.id = fieldValue.value;
    if (fieldValue.field.indexOf('startRegistrationDate') !== -1 && isNotEmpty(fieldValue.value)) filter.startRegistrationDate = fieldValue.value;
    if (fieldValue.field.indexOf('endRegistrationDate') !== -1 && isNotEmpty(fieldValue.value)) filter.endRegistrationDate = fieldValue.value;
    if (fieldValue.field.indexOf('merchantName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantName = fieldValue.value;
    if (fieldValue.field.indexOf('phoneNumber') !== -1 && isNotEmpty(fieldValue.value)) filter.phoneNumber = fieldValue.value;
    if (fieldValue.field.indexOf('mcc') !== -1 && isNotEmpty(fieldValue.value)) filter.mcc = fieldValue.value;
    if (fieldValue.field.indexOf('userLogin') !== -1 && isNotEmpty(fieldValue.value)) filter.userLogin = fieldValue.value;
    if (fieldValue.field.indexOf('merchantId') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantId = fieldValue.value;
    if (fieldValue.field.indexOf('merchantLocation') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantLocation = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterRegistration) {
    appendTitleFilter(filter.id);
    appendTitleFilter(filter.startRegistrationDate);
    appendTitleFilter(filter.endRegistrationDate);
    appendTitleFilter(filter.merchantName);
    appendTitleFilter(filter.phoneNumber);
    appendTitleFilter(filter.mcc);
    appendTitleFilter(filter.userLogin);
    appendTitleFilter(filter.merchantId);
    appendTitleFilter(filter.merchantLocation);
  }
}
