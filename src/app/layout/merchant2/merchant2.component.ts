import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterMerchant, FilterFieldValue, appendTitleFilter, clearTitleFilter, filterMerchantFormEmpty, getBtnFilter, getTitleFilter, isNotEmpty, merchantToDto } from '../../core/model/merchant.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { Merchant2Service } from '../../core/service/merchant2.service';
import { Merchant2DefaultSettings } from '../../core/service/merchant2-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';

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
  selectedMerchant;
  selectedMerchantId;
  filterForm: FormGroup;
  editForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('edit') edit: DialogComponent;
  isModalEdit: Boolean = false;
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService, private service: Merchant2Service) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.filterForm = this.formBuilder.group({
      merchantId: [''],
      mcc: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      bankName: ['']
    });

    this.editForm = this.formBuilder.group({
      merchantId: [''],
      mcc: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      taxId: [''],
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
  }

  public selectMerchant(merchant) {
    console.log(merchant);
    this.selectedMerchant = merchant;
    if (merchant != null) this.openEdit(merchant);
  }

  public selectMerchantId(merchant) {
    if (this.selectedMerchantId === merchant.merchantId) {
      this.selectMerchant(merchant);
    } else {
      this.selectedMerchantId = merchant.merchantId;
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
      const filter: FilterMerchant = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterMerchantFormEmpty());
      this.clearTitle();
      this.router.navigate(['merchant2']); //TODO: ???
      this.showSuccess('Сбросить', 'Фильтр');
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public openEdit(merchant) {
    this.editForm.setValue(merchant);

    document.getElementById('edit').style.display = 'block';
    this.isModalEdit = true;
    this.edit.show();
  }

  public onEdit: EmitType<object> = () => {
    // do Edit:
    document.getElementById('btnApplyEdit').onclick = (): void => {
      const dto = merchantToDto(this.editForm.value);
      this.apiService.updateMerchant(dto.merchantId, dto)
        .pipe(first())
        .subscribe(
          data => {
            this.edit.hide();
            this.showSuccess('Сохранить', dto.merchantId);
            this.router.navigate(['merchant2']); //TODO: ???
            this.showSuccess('Обновить', 'Организация');
          },
          error => {
            this.showError('Сохранить', dto.merchantId);
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
    const filter: FilterMerchant = filterMerchantFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterMerchant = this.filterForm.value;
    if (fieldValue.field.indexOf('merchantId') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantId = fieldValue.value;
    if (fieldValue.field.indexOf('merchantName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantName = fieldValue.value;
    if (fieldValue.field.indexOf('merchantLocation') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantLocation = fieldValue.value;
    if (fieldValue.field.indexOf('mcc') !== -1 && isNotEmpty(fieldValue.value)) filter.mcc = fieldValue.value;
    if (fieldValue.field.indexOf('merchantLegalName') !== -1 && isNotEmpty(fieldValue.value)) filter.merchantLegalName = fieldValue.value;
    if (fieldValue.field.indexOf('bankName') !== -1 && isNotEmpty(fieldValue.value)) filter.bankName = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterMerchant) {
    appendTitleFilter(filter.merchantId);
    appendTitleFilter(filter.merchantName);
    appendTitleFilter(filter.merchantLocation);
    appendTitleFilter(filter.mcc);
    appendTitleFilter(filter.merchantLegalName);
    appendTitleFilter(filter.bankName);
  }
}
