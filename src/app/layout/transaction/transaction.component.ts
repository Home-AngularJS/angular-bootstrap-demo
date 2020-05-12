import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterTransactionModel, FilterFieldValue, filterTransactionFormEmpty, getBtnFilter, appendTitleFilter, clearTitleFilter, getTitleFilter, isNotEmpty } from '../../core/model/transaction.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { TransactionService } from '../../core/service/transaction.service';
import { TransactionDefaultSettings } from '../../core/service/transaction-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { dtoToTerminal } from '../../core/model/terminal.model';
import { dtoToReceiptTemplate } from '../../core/model/receipt-template.model';
import * as moment from 'moment';
import { UserGrantPermission } from '../../core/model/user-role.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: TransactionService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [TransactionService, TransactionDefaultSettings]
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
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers
})
export class TransactionComponent implements OnInit {
  selectedTerminal;
  receiptTemplates = [];
  receiptTemplate;
  takeChoices: any;
  receiptNumber;
  filterForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };
  @ViewChild('viewTerminal') viewTerminal: DialogComponent;
  isModalViewTerminal: Boolean = false;
  @ViewChild('viewReceiptNumber') viewReceiptNumber: DialogComponent;
  isModalViewReceiptNumber: Boolean = false;
  title;
  // iframeReceiptNumber: string = 'https://www.youtube.com/embed/CD-E-LDc384'
  // iframeReceiptNumber: string = 'http://192.168.1.71:8090/receipt-template';
  iframeReceiptNumber;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location, private apiService: ApiService, private permission: UserGrantPermission, public dataService: DataService, private service: TransactionService) {
    this.iframeReceiptNumber = apiService.transactionsReceiptUrl + '/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  }

  ngOnInit() {
    this.takeChoices = this.dataService.getTakeChoices();

    this.filterForm = this.formBuilder.group({
      transactionId: [''],
      panMasked: [''],
      approvalCode: [''],
      rrn: [''],
      terminalId: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const filter: FilterTransactionModel = filterTransactionFormEmpty();
        const transactionId = params['transactionId'];
        if (isNotEmpty(transactionId)) filter.transactionId = transactionId;
        this.appendTitle(filter);
      });

    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            var entity: any = dtoToReceiptTemplate(data.content[i]);
            this.receiptTemplates.push(entity);
          }
        },
        error => {
          // alert( JSON.stringify(error) );
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
      const filter: FilterTransactionModel = this.filterForm.value;
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterTransactionFormEmpty());
      this.clearTitle();
      this.router.navigate(['transaction']);
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

  public onTerminalById: EmitType<object> = () => {
    document.getElementById('btnApplyViewTerminal').onclick = (): void => {
      this.viewTerminal.hide();
    };
  }

  public offTerminalById: EmitType<object> = () => {
  }

  public selectTerminalById(terminalId: any) {
    this.apiService.findTerminals({'terminalId': terminalId})
      .subscribe( data => {
          console.log(data)
          const terminals = data.content;
          if (terminals.length > 0) {
            const entity: any = dtoToTerminal(terminals[0]);
            entity.dateTimeInit = new Date(entity.dateTimeInit);
            entity.receiptTemplateId = entity.receiptTemplate.id;
            const ipsNames: any = [];
            for (let i = 0; i < terminals[0].allowedIpsCardGroups.length; i++) {
              ipsNames.push(terminals[0].allowedIpsCardGroups[i].ipsName);
            }
            entity.ipsNames = ipsNames;
            this.apiService.findDeviceByTerminalId(terminalId)
              .subscribe( data2 => {
                  const device: any = data2;
                  entity.deviceName = device.deviceName;
                },
                error => {
                  // alert( JSON.stringify(error) );
                });
            this.selectedTerminal = entity;
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
    document.getElementById('viewTerminal').style.display = 'block';
    this.isModalViewTerminal = true;
    this.viewTerminal.show();
  }


  public onReceiptNumber: EmitType<object> = () => {
    document.getElementById('btnApplyViewReceiptNumber').onclick = (): void => {
      this.viewReceiptNumber.hide();
    };
  }

  public offReceiptNumber: EmitType<object> = () => {
    this.router.navigate(['transaction']);
  }

  public selectReceiptNumber(transactionId: any) {
    this.iframeReceiptNumber = this.apiService.transactionsReceiptUrl + '/' + transactionId;
    console.log(this.iframeReceiptNumber)

    document.getElementById('viewReceiptNumber').style.display = 'block';
    this.isModalViewReceiptNumber = true;
    this.viewReceiptNumber.show();
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
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
    const filter: FilterTransactionModel = filterTransactionFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterTransactionModel = this.filterForm.value;
    if (fieldValue.field.indexOf('transactionId') !== -1 && isNotEmpty(fieldValue.value)) filter.transactionId = fieldValue.value;
    if (fieldValue.field.indexOf('panMasked') !== -1 && isNotEmpty(fieldValue.value)) filter.panMasked = fieldValue.value;
    if (fieldValue.field.indexOf('terminalId') !== -1 && isNotEmpty(fieldValue.value)) filter.terminalId = fieldValue.value;
    if (fieldValue.field.indexOf('approvalCode') !== -1 && isNotEmpty(fieldValue.value)) filter.approvalCode = fieldValue.value;
    if (fieldValue.field.indexOf('rrn') !== -1 && isNotEmpty(fieldValue.value)) filter.rrn = fieldValue.value;
    return filter;
  }

  private appendTitleByObject(filter: FilterTransactionModel) {
    appendTitleFilter(filter.transactionId);
    appendTitleFilter(filter.panMasked);
    appendTitleFilter(filter.terminalId);
    appendTitleFilter(filter.approvalCode);
    appendTitleFilter(filter.rrn);
  }
}
