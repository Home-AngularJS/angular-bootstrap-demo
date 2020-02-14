import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {
  FilterUser,
  FilterFieldValue,
  appendTitleFilter,
  clearTitleFilter,
  filterUserFormEmpty,
  getBtnFilter,
  getTitleFilter,
  isNotEmpty,
  userToDto,
  userNew
} from '../../core/model/user.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { UserService } from '../../core/service/user.service';
import { UserDefaultSettings } from '../../core/service/user-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { MustMatch } from '../../core/helpers/must-match.validator';
import { dtoToServiceGroup } from '../../core/model/service-group.model';
import { dtoToBank } from '../../core/model/bank.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: UserService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [UserService, UserDefaultSettings]
}];

class ItemFile {
  file: File;
  uploadProgress: string;
  responseStatus: string;
  isUploading: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers
})
export class UserComponent implements OnInit {
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
  @ViewChild('createList') createList: DialogComponent;
  isModalCreateList: Boolean = false;
  title;
  items: ItemFile[] = [];
  message: string = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: UserService) { }

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

    /**
     * @see https://embed.plnkr.co/plunk/I0J0Zi
     *      https://angular-templates.io/tutorials/about/angular-forms-and-validations
     *      https://regex101.com/r/kb2Jh1/2
     */
    this.createForm = this.formBuilder.group({
      userLogin: ['', Validators.required],
      merchantName: ['', Validators.required],
      merchantLegalName: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(6)]], //, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
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
      phoneNumber: ['', [Validators.pattern(/^\+?\d{2}[- ]?\d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/)]],
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
      bankId: [''],
      createdDate: [''],
      latitude: [''],
      longitude: [''],
      radius: [''],
      status: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterUser = filterUserFormEmpty();
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
    //     && entity.phoneNumber!=null
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
      const filter: FilterUser = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterUserFormEmpty());
      this.clearTitle();
      this.router.navigate(['registration']); //TODO: ???
      this.showSuccess('Сбросить', 'Фильтр');
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public openOneCreate() {
    this.createForm.setValue(userNew());

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
      const dto = userToDto(entity);
      console.log(dto)
      this.apiService.registerTerminalData(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.create.hide();
            this.showSuccess('Сохранить', 'Ручная регистрация торговца');
            this.router.navigate(['registration']);
            this.showSuccess('Обновить', 'Предварительная регистрация торговцев');
            this.createSubmittedForm = false;
            this.isButtonSave = false;
          },
          error => {
            this.showError('Сохранить', 'Ручная регистрация торговца');
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

  public openListCreate() {
    document.getElementById('createList').style.display = 'block';
    this.isModalCreateList = true;
    this.createList.show();
  }

  public onCreateList: EmitType<object> = () => {
    // do CreateList:
    document.getElementById('btnOkCreateList').onclick = (): void => {
      this.createList.hide();
      this.items = [];
      this.router.navigate(['registration']);
      this.showSuccess('Обновить', 'Предварительная регистрация торговцев');
    };

    // cancelList:
    document.getElementById('btnCancelCreateList').onclick = (): void => {
      this.createList.hide();
      this.items = [];
    };
  }

  public offCreateList: EmitType<object> = () => {
    this.items = [];
  }

  selectFiles = (event) => {
    this.items = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (files.item(i).name.match(/\.(doc|docm|docx|dot|dotm|dotx|odt|rtf|txt|wps|csv|xla|xlam|xls|xlsb|xlsm|xlsx|xlt|xltm|xltx|xml|xps)$/)) {
        this.items.push({file: files.item(i), uploadProgress: '0', responseStatus: '', isUploading: false});
      } else {
        this.showError('Списковая регистрация торговцев', 'не поддерживается формат файла');
      }
    }
    this.message = `${this.items.length} valid image(s) selected`;
  }

  uploadFile(item: ItemFile) {
    const formData = new FormData();
    formData.append('image', item.file, item.file.name);
    return this.http.post('http://192.168.1.71:5000/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress ) item.uploadProgress = `${(event.loaded / event.total * 100)}%`;
      if (event.type === HttpEventType.Response) {
        let body: any = event.body;
        console.log('Загрузка файла "' + item.file.name + '" успешно завершена')
        this.showSuccess('Списковая регистрация торговцев', 'Загрузка файла "' + item.file.name + '" успешно завершена');
        let status: string = body.status
        item.responseStatus = status
        item.isUploading = true;
      }
    }, error => {
      // alert( JSON.stringify(error) );
      console.log('Ошибка загрузки файла: "' + item.file.name)
      this.showError('Списковая регистрация торговцев', 'Ошибка загрузки файла: "' + item.file.name);
      item.responseStatus = 'ERR'
    });
  }

  cancelFile(item: ItemFile) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]==item) {
        this.items[i].uploadProgress = '0'
        this.items[i].responseStatus = ''
      }
    }
  }

  /**
   * @see https://stackoverflow.com/questions/15453979/how-do-i-delete-an-item-or-object-from-an-array-using-ng-click
   */
  removeFile(item: ItemFile) {
    this.items.splice(this.items.indexOf(item),1);
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
    //   const dto = userToDto(this.editForm.value);
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
    const filter: FilterUser = filterUserFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterUser = this.filterForm.value;
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

  private appendTitleByObject(filter: FilterUser) {
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
