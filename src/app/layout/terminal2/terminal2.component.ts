import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterTerminal, FilterFieldValue, appendTitleFilter, clearTitleFilter, filterTerminalFormEmpty, getBtnFilter, getTitleFilter, isNotEmpty, terminalToDto } from '../../core/model/terminal.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { Terminal2Service } from '../../core/service/terminal2.service';
import { Terminal2DefaultSettings } from '../../core/service/terminal2-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { dtoToReceiptSendChannel, multiselectToEntity } from '../../core/model/receipt-send-channel.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: Terminal2Service, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [Terminal2Service, Terminal2DefaultSettings]
}];

@Component({
  selector: 'app-terminal2',
  templateUrl: './terminal2.component.html',
  styleUrls: ['./terminal2.component.css'],
  providers
})
export class Terminal2Component implements OnInit {
  selectedTerminal;
  selectedTerminalId;
  takeChoices: any;
  allIpsNames: any = [];
  allAllowedLanguages = [];
  allReceiptSendChannels = [];
  allReceiptSendChannelsDto = [];
  allAllowedIpsCardGroups: any = [];
  ipsNamesSettings = {};
  allowedLanguagesSettings = {};
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
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: Terminal2Service) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();
    this.allAllowedLanguages = this.dataService.getAllAllowedLanguages();
    this.basicReceiptSendChannels = this.dataService.getBasicReceiptSendChannels();

    this.allowedLanguagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

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
      configChanged: [''], //TODO: ??
      dateTimeInit: [''],
      legalName: [''],
      geoPosition: [''],
      manual: [''], //TODO: ??
      opPurchase: [''],
      opRefund: [''],
      opReversal: [''],
      pin: [''], //TODO: ??
      receiptTemplate: [''], //TODO: ??
      receiptTemplateId: [''], //TODO: ??
      merchantId: [''],
      merchantName: [''],
      merchantLocation: [''],
      taxId: [''],
      mcc: [''],
      bankName: [''],
      allowedLanguages: [''],
      productNames: [''],
      ipsNames: [''], //TODO: ??
      oneTransactionLimit: [''],
      noPinLimit: [''],
      totalAmountTerminalLimit: [''],
      opQr: [''],
      addData: [''],
      receiptSendChannels: [''],
      deviceName: [''],
      zreportTime: [''],
      zreportEnabled: [''],
      zreportEnabledAll: [''],
      nfc: [''], //TODO: ??
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
          for (let i = 0; i < allAllowedIpsCardGroups.length; i++) {
            this.allIpsNames.push(allAllowedIpsCardGroups[i].ipsName);
          }
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
      this.router.navigate(['terminal2']); //TODO: ???
      this.showSuccess('Сбросить', 'Фильтр');
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public openEdit(terminal) {
    console.log(terminal)
    this.editForm.setValue(terminal);

    document.getElementById('edit').style.display = 'block';
    this.isModalEdit = true;
    this.edit.show();
  }

  public onEdit: EmitType<object> = () => {
    // do Edit:
    document.getElementById('btnApplyEdit').onclick = (): void => {
      const dto = terminalToDto(null, this.editForm.value);
      this.apiService.updateTerminal(dto.terminalId, dto)
        .pipe(first())
        .subscribe(
          data => {
            this.edit.hide();
            this.showSuccess('Сохранить', dto.terminalId);
            this.router.navigate(['terminal2']); //TODO: ???
            this.showSuccess('Обновить', 'Организация');
          },
          error => {
            this.showError('Сохранить', dto.terminalId);
          });
    };

    // cancel:
    document.getElementById('btnCancelEdit').onclick = (): void => {
      this.edit.hide();
    };
  }

  public offEdit: EmitType<object> = () => {
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
