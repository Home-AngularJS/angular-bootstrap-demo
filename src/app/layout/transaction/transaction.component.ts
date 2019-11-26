import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {filterTransactionFormEmpty, getBtnFilter, allReceiptNumbers, dtoToTransaction} from '../../core/model/transaction.model';
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
  // video: string = 'https://www.youtube.com/embed/CD-E-LDc384'
  // video: string = 'http://192.168.1.71:8090/receipt-template';
  video;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: TransactionService) {
    this.video = apiService.transactionsReceiptUrl + '/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

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
        const transactionId = params['transactionId'];
        if (transactionId===undefined) {
        } else {
          this.title = ' ➠ ' + transactionId;
        }
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
          alert( JSON.stringify(error) );
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
      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterTransactionFormEmpty());
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public btnFilter(filter: any) {
    const filters = filter.split('&');
    if (Array.isArray(filters) && filters.length && 1<filters.length) {
      for (let f = 0; f < filters.length; f++) {
        const _filter = getBtnFilter(filters[f]);
        if (_filter.field==='transactionId') this.title = _filter.value!='' ? ' ➠ ' + _filter.value : _filter.value;
      }
    } else {
      const _filter = getBtnFilter(filter);
      if (_filter.value!='') this.title = ' ➠ ' + _filter.value;
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
                  alert( JSON.stringify(error) );
                });
            this.selectedTerminal = entity;
          }
        },
        error => {
          alert( JSON.stringify(error) );
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

  public selectReceiptNumber(receiptNumber: any, transaction: any) {
    // for (let i = 0; i < this.receiptTemplates.length; i++) {
    //   const receiptTemplate = this.receiptTemplates[i];
    //   if (receiptTemplate.id == receiptNumber) {
    //     this.receiptTemplate = receiptTemplate;
    //     this.receiptTemplate.templateBody = this.toReplace( receiptTemplate.templateBody, transaction);
    //     this.video = 'http://localhost:8090/receipt-template-params?templateStyle=' + this.receiptTemplate.templateStyle + '&templateStyle=' + this.receiptTemplate.templateStyle;
    //   }
    // }
    // this.video = 'http://192.168.1.71:8090/receipt-template/' + receiptNumber + '?transactionId=' + transaction.transactionIdReal;
    this.video = this.apiService.transactionsReceiptUrl + '/' + transaction.transactionIdReal;
    console.log(this.video)

    document.getElementById('viewReceiptNumber').style.display = 'block';
    this.isModalViewReceiptNumber = true;
    this.viewReceiptNumber.show();
  }

  private toReplace(templateBody: string, transaction: any) {
    // console.log('__AMOUNT__ = ' + transaction.amount)
    // console.log('__PAN_MASKA__ = ' + transaction.panMasked)
    // console.log('__REC_NUM__ = ' + transaction.receiptNumber)
    // console.log('__TYPE_OPERATION_TEXT__ = ' + transaction.operation)
    // console.log('__RESP_TEXT__ = ' + transaction.statusCode)
    // console.log('__RESP_CODE__ = ' + transaction.responseCode)
    // // console.log('__TYPE_OPERATION_CODE__ = ' + transaction.operation.operation)
    // console.log('__AUTH_CODE__ = ' + transaction.approvalCode)
    // console.log('__RRN__ = ' + transaction.rrn)
    // // console.log('__IPS__ = ' + transaction.rrn)
    // console.log('__TRANSACTION_TIME__ = ' + moment(transaction.transactionDate).format('HH:mm:ss'))
    // console.log('__TRANSACTION_DATE__ = ' + moment(transaction.transactionDate).format('MM/DD/YYYY'))
    // console.log('__TERM_ID__ = ' + transaction.terminalId)
    // console.log('__MERCH_ID__ = ' + transaction.merchantId)
    // console.log('__M_NAME__ = ' + transaction.merchantName)
    // console.log('__M_LOCATION__ = ' + transaction.merchantLocation)
    // console.log('__NAME_BANK__ = ' + transaction.bankName)
    return templateBody.replace('__AMOUNT__', transaction.amount)
      .replace('__PAN_MASKA__', transaction.panMasked)
      .replace('__REC_NUM__', transaction.receiptNumber)
      .replace('__TYPE_OPERATION_TEXT__', transaction.operation)
      .replace('__RESP_TEXT__', transaction.statusCode)
      .replace('__RESP_CODE__', transaction.responseCode)
      // .replace('__TYPE_OPERATION_CODE__', transaction.operation.operation)
      .replace('__AUTH_CODE__', transaction.approvalCode)
      .replace('__RRN__', transaction.rrn)
      // .replace('__IPS__', transaction.rrn)
      .replace('__TRANSACTION_TIME__', moment(transaction.transactionDate).format('HH:mm:ss'))
      .replace('__TRANSACTION_DATE__', moment(transaction.transactionDate).format('MM/DD/YYYY'))
      .replace('__TERM_ID__', transaction.terminalId)
      .replace('__NAME_BANK__', transaction.bankName)
      .replace('__MERCH_ID__', transaction.merchantId)
      .replace('__M_NAME__', transaction.merchantName)
      .replace('__M_LOCATION__', transaction.merchantLocation);
  }
}
