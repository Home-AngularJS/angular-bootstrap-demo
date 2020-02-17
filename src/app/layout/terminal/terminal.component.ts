import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterTerminal, FilterFieldValue, dtoToTerminal, terminalToDto, appendTitleFilter, clearTitleFilter, filterTerminalFormEmpty, getBtnFilter, getTitleFilter, isNotEmpty, terminalToUpdate, isEmpty } from '../../core/model/terminal.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { TerminalService } from '../../core/service/terminal.service';
import { TerminalDefaultSettings } from '../../core/service/terminal-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import {dtoToReceiptSendChannel, multiselectToEntity, receiptSendChannelToDto} from '../../core/model/receipt-send-channel.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: TerminalService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [TerminalService, TerminalDefaultSettings]
}];

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  providers
})
export class TerminalComponent implements OnInit {
  selectedTerminal;
  selectedTerminalId;
  selectedTerminalDeviceSn;
  serviceGroups;
  selectedServiceGroup;
  selectedTerminalZreportTime = [];
  products;
  takeChoices: any;
  takeChoiceActions: any;
  allIpsNames: any = [];
  // allAllowedLanguages = [];
  allReceiptSendChannels = [];
  allReceiptSendChannelsDto = [];
  allAllowedIpsCardGroups: any = [];
  allProductIds: any = [];
  productIdsSettings = {};
  ipsNamesSettings = {};
  // allowedLanguagesSettings = {};
  receiptSendChannelsSettings = {};
  basicReceiptSendChannels;
  isButtonSave: Boolean = false;
  receiptTemplates;
  filterForm: FormGroup;
  editForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('edit') edit: DialogComponent;
  isModalEdit: Boolean = false;
  @ViewChild('filterTerminal') filterTerminal: DialogComponent;
  @ViewChild('viewTerminalGroup') viewTerminalGroup: DialogComponent;
  isModalView: Boolean = false;
  @ViewChild('viewViewZreportTime') viewViewZreportTime: DialogComponent;
  isModalViewZreportTime: Boolean = false;
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: TerminalService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();
    this.takeChoiceActions = this.dataService.getTakeChoiceActions();
    // this.allAllowedLanguages = this.dataService.getAllAllowedLanguages();
    this.basicReceiptSendChannels = this.dataService.getBasicReceiptSendChannels();

    // this.allowedLanguagesSettings = {
    //   itemsShowLimit: 1,
    //   noDataAvailablePlaceholderText: 'нет данных',
    //   selectAllText: 'Выбрать все',
    //   unSelectAllText: 'Игнорировать все',
    // };

    this.receiptSendChannelsSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.ipsNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      disabled: true
    };

    this.productIdsSettings = {
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.filterForm = this.formBuilder.group({
      terminalId: [''],
      groupNumber: [''],
      dateTimeInit: [''],
      merchantName: [''],
      legalName: ['']
    });

    this.editForm = this.formBuilder.group({
      terminalId: ['', Validators.required],
      groupNumber: ['', Validators.required],
      dateTimeInit: [''],
      legalName: [''],
      geoPosition: [''],
      opManual: [''],
      opPurchase: [''],
      opRefund: [''],
      opReversal: [''],
      opPin: [''],
      receiptTemplate: [''],
      receiptTemplateId: [''],
      merchantId: [''],
      merchantName: [''],
      merchantLocation: [''],
      taxId: [''],
      mcc: [''],
      bankName: [''],
      // allowedLanguages: [''],
      productNames: [''],
      productIds: [''],
      ipsNames: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
      totalAmountTerminalLimit: [''],
      opQr: [''],
      addData: [''],
      receiptSendChannels: [''],
      deviceName: [''],
      deviceSn: [''],
      zreportTime: [''],
      zreportEnabled: [''],
      zreportEnabledAll: [''],
      opNfc: [''],
      totalAmountLimit: [''],
      totalCountLimit: [''],
      totalLimitPeriod: [''],
      block: [''],
      lastTransactionDate: [''],
      lastUpdateDate: ['']
    });

    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          this.receiptTemplates = data.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllReceiptSendChannels()
      .subscribe( data => {
          console.log(data)
          const allReceiptSendChannels = data.content;
          this.allReceiptSendChannelsDto = allReceiptSendChannels;
          this.allReceiptSendChannels = dtoToReceiptSendChannel(allReceiptSendChannels);
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          const allAllowedIpsCardGroups: any = data.content;
          this.allAllowedIpsCardGroups = allAllowedIpsCardGroups;
          const allIpsNames: any = [];
          for (let i = 0; i < allAllowedIpsCardGroups.length; i++) {
            allIpsNames.push(allAllowedIpsCardGroups[i].ipsName);
          }
          this.allIpsNames = allIpsNames;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllProducts()
      .subscribe( data => {
          console.log(data)
          const products: any = data.content
          this.products = products;
          const allProductIds: any = [];
          for (let i = 0; i < products.length; i++) allProductIds.push(products[i].productId);
          this.allProductIds = allProductIds;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const terminalGroups: any = data.content
          this.serviceGroups = terminalGroups;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterTerminal = filterTerminalFormEmpty();
        const terminalId = params['terminalId'];
        if (isNotEmpty(terminalId)) filter.terminalId = terminalId;
        this.appendTitle(filter);
      });
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  public onSelectReceiptSendChannels(item: any) {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onDeSelectReceiptSendChannels(item: any) {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onDropDownCloseReceiptSendChannels() {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onSelectAllReceiptSendChannels(items: any) {
    this.setButtonSaveByItems(items);
  }

  public onDeSelectAllReceiptSendChannels(items: any) {
    this.setButtonSaveByItems(items);
  }

  private setButtonSaveByEntity(entity) {
    this.isButtonSave = false;
    if (entity.receiptSendChannels.length === 0) {
      // this.resetReceiptSendChannels();
    } else {
      if (entity.receiptSendChannels.length > 0) {
        for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
          if (entity.receiptSendChannels.indexOf(this.basicReceiptSendChannels[b]) > -1) {
            this.isButtonSave = true;
          }
        }
      }
    }
  }

  private setButtonSaveByItems(items) {
    this.isButtonSave = false;
    if (items.length === 0) {
      // this.resetReceiptSendChannels();
    } else {
      if (items.length > 0) {
        for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
          if (items.indexOf(this.basicReceiptSendChannels[b]) > -1) {
            this.isButtonSave = true;
          }
        }
      }
    }
  }

  public selectTerminal(terminal) {
    console.log(terminal);
    this.selectedTerminal = Object.assign({}, terminal); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    if (terminal != null) this.openEdit(terminal);
  }

  public selectTerminalId(terminal) {
    if (this.selectedTerminalId === terminal.terminalId) {
      this.selectTerminal(terminal);
    } else {
      this.selectedTerminalId = terminal.terminalId;
    }

    console.log(terminal)
    this.selectedTerminalDeviceSn = terminal.deviceSn;
  }

  public onServiceGroupByNumber: EmitType<object> = () => {
    document.getElementById('btnApplyViewTerminalGroup').onclick = (): void => {
      this.viewTerminalGroup.hide();
    };
  }

  public offServiceGroupByNumber: EmitType<object> = () => {
  }

  public selectServiceGroupByNumber(groupNumber: any) {
    for (let i = 0; i < this.serviceGroups.length; i++) {
      if (this.serviceGroups[i].groupNumber === groupNumber) {
        this.selectedServiceGroup = Object.assign({}, this.serviceGroups[i]); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2

        this.selectedServiceGroup.allowedLanguageIds = [];
        // for (let a = 0; a < this.selectedServiceGroup.allowedLanguages.length; a++) this.selectedServiceGroup.allowedLanguageIds.push(this.selectedServiceGroup.allowedLanguages[a].languageId);

        this.selectedServiceGroup.opPurchase = (this.selectedServiceGroup.opPurchase == 'Y') ? 'Да' : 'Нет';
        this.selectedServiceGroup.opManual = (this.selectedServiceGroup.opManual == 'Y') ? 'Да' : 'Нет';
        this.selectedServiceGroup.opReversal = (this.selectedServiceGroup.opReversal == 'Y') ? 'Да' : 'Нет';
        this.selectedServiceGroup.opRefund = (this.selectedServiceGroup.opRefund == 'Y') ? 'Да' : 'Нет';
        this.selectedServiceGroup.opPin = (this.selectedServiceGroup.opPin == 'Y') ? 'Да' : 'Нет';
        this.selectedServiceGroup.geoPosition = (this.selectedServiceGroup.geoPosition == 'Y') ? 'Да' : 'Нет';
      }
    }
    document.getElementById('viewTerminalGroup').style.display = 'block';
    this.isModalView = true;
    this.viewTerminalGroup.show();
  }

  public onZreportTime: EmitType<object> = () => {
    document.getElementById('btnApplyViewZreportTime').onclick = (): void => {
      this.viewViewZreportTime.hide();
    };
  }

  public offZreportTime: EmitType<object> = () => {
    this.selectedTerminalZreportTime = [];
  }

  public selectZreportTime(terminal: any) {
    const terminalZreportTime = terminal.zreportTime;
    const terminalZreportEnabled = terminal.zreportEnabled;
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.monday) || terminalZreportEnabled.monday==='N') ? 'Пн - нет' : 'Пн - ' + terminalZreportTime.monday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.tuesday) || terminalZreportEnabled.tuesday==='N') ? 'Вт - нет' : 'Вт - ' + terminalZreportTime.tuesday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.wednesday) || terminalZreportEnabled.wednesday==='N') ? 'Ср - нет' : 'Ср - ' + terminalZreportTime.wednesday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.thursday) || terminalZreportEnabled.thursday==='N') ? 'Чт - нет' : 'Чт - ' + terminalZreportTime.thursday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.friday) || terminalZreportEnabled.friday==='N') ? 'Пт - нет' : 'Пт - ' + terminalZreportTime.friday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.saturday) || terminalZreportEnabled.saturday==='N') ? 'Сб - нет' : 'Сб - ' + terminalZreportTime.saturday);
    this.selectedTerminalZreportTime.push((isEmpty(terminalZreportTime.sunday) || terminalZreportEnabled.sunday==='N') ? 'Вс - нет' : 'Вс - ' + terminalZreportTime.sunday);

    document.getElementById('viewViewZreportTime').style.display = 'block';
    this.isModalViewZreportTime = true;
    this.viewViewZreportTime.show();
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
      const filter: FilterTerminal = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterTerminalFormEmpty());
      this.clearTitle();
      this.router.navigate(['terminal']); //TODO: ???
      this.showSuccess('Сбросить', 'Фильтр');
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public openEdit(terminal) {
    this.editForm.setValue(terminal);
    document.getElementById('edit').style.display = 'block';
    this.isModalEdit = true;
    this.edit.show();
  }

  public onEdit: EmitType<object> = () => {
    // do Edit:
    document.getElementById('btnApplyEdit').onclick = (): void => {
      console.log(this.editForm.value)
      const entity = this.dtoToTerminal(this.editForm.value);
      console.log(entity)
      const update = terminalToUpdate(entity);
      update.receiptSendChannelIdList = receiptSendChannelToDto(this.allReceiptSendChannelsDto, entity.receiptSendChannels)

      this.apiService.updateTerminal(this.selectedTerminal.terminalId, update)
        .pipe(first())
        .subscribe(
          data => {
            this.edit.hide();
            this.showSuccess('Сохранить', entity.terminalId);
            this.router.navigate(['terminal']); //TODO: ???
            this.showSuccess('Обновить', 'Терминал');
          },
          error => {
            this.showError('Сохранить', entity.terminalId);
          });
    };

    // cancel:
    document.getElementById('btnCancelEdit').onclick = (): void => {
      this.edit.hide();
    };
  }

  public offEdit: EmitType<object> = () => {
  }

  private dtoToTerminal(entity: any) {
    // multiselectToEntity(entity.allowedLanguages)
    multiselectToEntity(entity.ipsNames)
    multiselectToEntity(entity.productNames)

    const ipsCardGroupIdList: any = [];
    for (let i = 0; i < this.allAllowedIpsCardGroups.length; i++) {
      const ipsCardGroupIdEntity = this.allAllowedIpsCardGroups[i];
      for (let j = 0; j < entity.ipsNames.length; j++) {
        if (ipsCardGroupIdEntity.ipsName === entity.ipsNames[j]) {
          ipsCardGroupIdList.push(ipsCardGroupIdEntity.ipsCardGroupId);
        }
      }
    }
    entity.ipsCardGroupIdList = ipsCardGroupIdList;
    entity.productIdList = entity.productIds;

    return entity;
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public btnFilter(filter: any) {
    this.selectedTerminalDeviceSn = null;
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
    const filter: FilterTerminal = filterTerminalFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterTerminal = this.filterForm.value;
    if (fieldValue.field.indexOf('terminalId') !== -1 && isNotEmpty(fieldValue.value)) filter.terminalId = fieldValue.value;
    if (fieldValue.field.indexOf('groupNumber') !== -1 && isNotEmpty(fieldValue.value)) filter.groupNumber = fieldValue.value;
    if (fieldValue.field.indexOf('dateTimeInit') !== -1 && isNotEmpty(fieldValue.value)) filter.dateTimeInit = fieldValue.value;
    if (fieldValue.field.indexOf('merchantName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantName = fieldValue.value;
    if (fieldValue.field.indexOf('legalName') !== -1 && isNotEmpty(fieldValue.value)) filter.legalName = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterTerminal) {
    appendTitleFilter(filter.terminalId);
    appendTitleFilter(filter.groupNumber);
    appendTitleFilter(filter.dateTimeInit);
    appendTitleFilter(filter.merchantName);
    appendTitleFilter(filter.legalName);
  }
}
