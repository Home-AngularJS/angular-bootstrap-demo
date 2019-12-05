import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterMerchant, FilterFieldValue, appendTitleFilter, clearTitleFilter, filterMerchantFormEmpty, getBtnFilter, getTitleFilter, isNotEmpty } from '../../core/model/merchant.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { Merchant2Service } from '../../core/service/merchant2.service';
import { Merchant2DefaultSettings } from '../../core/service/merchant2-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { multiselectToEntity } from '../../core/model/receipt-send-channel.model';
import {Merchant2DataSource} from '../../core/service/merchant2.datasource';

const providers = [{
  provide: SmartTable,
  useFactory: (service: Merchant2Service, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [Merchant2Service, Merchant2DefaultSettings]
}];

@Component({
  selector: 'app-merchant2',
  templateUrl: './merchant2.component.html',
  styleUrls: ['./merchant2.component.css'],
  providers
})
export class Merchant2Component implements OnInit {
  statusChoices;
  allAttestation = [];
  filterForm: FormGroup;
  @ViewChild('filterBlock') filterBlock: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  title;
  isOnDeSelect = false;
  isOnDeSelectAll = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: Merchant2Service) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * https://www.npmjs.com/package/angular2-multiselect-dropdown
     * https://nileshpatel17.github.io/ng-multiselect-dropdown
     *
     * https://github.com/NileshPatel17/ng-multiselect-dropdown
     * https://stackblitz.com/edit/ng-multiselect-dropdown
     */
    this.allAttestation = this.dataService.getAllAttestation();

    this.filterForm = this.formBuilder.group({
      merchantId: [''],
      shortMerchantId: [''],
      mcc: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      bankName: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterMerchant = filterMerchantFormEmpty();
        const merchantId = params['merchantId'];
        if (isNotEmpty(merchantId)) filter.merchantId = merchantId;
        this.appendTitle(filter);
      });

    this.statusChoices = this.dataService.getStatusChoices();
  }

  public openFilter: EmitType<object> = () => {
    console.log(this.filterForm.value)

    document.getElementById('filterBlock').style.display = 'block';
    this.isModalFilter = true;
    this.filterBlock.show();
  }

  public onFilter: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      const filter: FilterMerchant = this.filterForm.value;
      this.appendTitle(filter);

      this.filterBlock.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterMerchantFormEmpty());
      this.clearTitle();
      this.router.navigate(['merchant2']);
    };
  }

  public offFilter: EmitType<object> = () => {
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

  public onItemSelect(item: any) {
  }

  public onDeSelect(item: any) {
    this.isOnDeSelect = true;
  }

  public onSelectAll(items: any) {
  }

  public onDeSelectAll(items: any) {
    this.isOnDeSelectAll = true;
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
    const filter: FilterMerchant = filterMerchantFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterMerchant = this.filterForm.value;
    if (fieldValue.field.indexOf('merchantId') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantId = fieldValue.value;
    if (fieldValue.field.indexOf('shortMerchantId') !== -1 && isNotEmpty(fieldValue.value)) filter.shortMerchantId = fieldValue.value;
    if (fieldValue.field.indexOf('mcc') !== -1 && isNotEmpty(fieldValue.value)) filter.mcc = fieldValue.value;
    if (fieldValue.field.indexOf('merchantLegalName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantLegalName = fieldValue.value;
    if (fieldValue.field.indexOf('merchantLocation') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantLocation = fieldValue.value;
    if (fieldValue.field.indexOf('merchantName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantName = fieldValue.value;
    if (fieldValue.field.indexOf('bankName') !== -1 && isNotEmpty(fieldValue.value)) filter.bankName = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterMerchant) {
    appendTitleFilter(filter.merchantId);
    appendTitleFilter(filter.shortMerchantId);
    appendTitleFilter(filter.mcc);
    appendTitleFilter(filter.merchantLegalName);
    appendTitleFilter(filter.merchantLocation);
    appendTitleFilter(filter.merchantName);
    appendTitleFilter(filter.bankName);
  }
}
