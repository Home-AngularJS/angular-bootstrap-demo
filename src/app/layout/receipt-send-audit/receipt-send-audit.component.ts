import {Component, OnInit, Pipe, PipeTransform, ViewChild, ViewEncapsulation} from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterReceiptSendAuditModel, FilterFieldValue, filterReceiptSendAuditFormEmpty, getBtnFilter, appendTitleFilter, clearTitleFilter, getTitleFilter, isNotEmpty } from '../../core/model/receipt-send-audit.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { ReceiptSendAuditService } from '../../core/service/receipt-send-audit.service';
import { ReceiptSendAuditDefaultSettings } from '../../core/service/receipt-send-audit-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DomSanitizer } from '@angular/platform-browser';

const providers = [{
  provide: SmartTable,
  useFactory: (service: ReceiptSendAuditService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [ReceiptSendAuditService, ReceiptSendAuditDefaultSettings]
}];

/**
 * @see https://www.linkedin.com/pulse/working-iframe-angular-thiago-adriano
 */
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-receipt-send-audit',
  templateUrl: './receipt-send-audit.component.html',
  styles: [
    require('./receipt-send-audit.component.css')
  ],
  providers
})
export class ReceiptSendAuditComponent implements OnInit {
  selectedTransaction;
  takeChoices: any;
  filterForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('viewTransaction') viewTransaction: DialogComponent;
  isModalViewTransaction: Boolean = false;
  @ViewChild('viewReceiptNumber') viewReceiptNumber: DialogComponent;
  isModalViewReceiptNumber: Boolean = false;
  title;
  iframeReceiptNumber;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: ReceiptSendAuditService) {
    this.iframeReceiptNumber = apiService.transactionsReceiptUrl + '/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();

    this.filterForm = this.formBuilder.group({
      receiptNumber: [''],
      transactionId: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterReceiptSendAuditModel = filterReceiptSendAuditFormEmpty();
        // const id = params['id'];
        // if (isNotEmpty(id)) filter.id = id;
        this.appendTitle(filter);
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
      const filter: FilterReceiptSendAuditModel = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterReceiptSendAuditFormEmpty());
      this.clearTitle();
      this.router.navigate(['receipt-send-audit']);
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

  public onTransactionById: EmitType<object> = () => {
  }

  public offTransactionById: EmitType<object> = () => {
  }

  // public selectTransactionById(transactionId: any) {
  //   this.apiService.findTransactions({'transactionId': transactionId})
  //     .subscribe( data => {
  //         console.log(data)
  //         for (let i = 0; i < data.content.length; i++) {
  //           const transaction: any = data.content[i];
  //           const entity: any = dtoToTransaction(transaction);
  //           this.selectedTransaction = entity;
  //         }
  //       },
  //       error => {
  //         // alert( JSON.stringify(error) );
  //       });
  //   document.getElementById('viewTransaction').style.display = 'block';
  //   this.isModalViewTransaction = true;
  //   this.viewTransaction.show();
  // }


  public onReceiptNumber: EmitType<object> = () => {
    document.getElementById('btnApplyViewReceiptNumber').onclick = (): void => {
      this.viewReceiptNumber.hide();
    };
  }

  public offReceiptNumber: EmitType<object> = () => {
    this.router.navigate(['receipt-send-audit']);
  }

  public selectReceiptNumber(transactionId: any) {
    this.iframeReceiptNumber = this.apiService.transactionsReceiptUrl + '/' + transactionId;
    console.log(this.iframeReceiptNumber)

    document.getElementById('viewReceiptNumber').style.display = 'block';
    this.isModalViewReceiptNumber = true;
    this.viewReceiptNumber.show();
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
    const filter: FilterReceiptSendAuditModel = filterReceiptSendAuditFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterReceiptSendAuditModel = this.filterForm.value;
    if (fieldValue.field.indexOf('receiptNumber') !== -1 && isNotEmpty(fieldValue.value)) filter.receiptNumber = fieldValue.value;
    if (fieldValue.field.indexOf('transactionId') !== -1 && isNotEmpty(fieldValue.value)) filter.transactionId = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterReceiptSendAuditModel) {
    appendTitleFilter(filter.receiptNumber);
    appendTitleFilter(filter.transactionId);
  }
}
