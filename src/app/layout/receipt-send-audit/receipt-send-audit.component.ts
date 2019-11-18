import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { filterReceiptSendAuditFormEmpty, getBtnFilter } from '../../core/model/receipt-send-audit.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { ReceiptSendAuditService } from '../../core/service/receipt-send-audit.service';
import { ReceiptSendAuditDefaultSettings } from '../../core/service/receipt-send-audit-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { dtoToTransaction } from '../../core/model/transaction.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: ReceiptSendAuditService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [ReceiptSendAuditService, ReceiptSendAuditDefaultSettings]
}];

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
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: ReceiptSendAuditService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();

    this.filterForm = this.formBuilder.group({
      id: [''],
      transactionId: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const id = params['id'];
        if (id===undefined) {
        } else {
          this.title = ' ➠ ' + id;
        }
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
      this.filterForm.setValue(filterReceiptSendAuditFormEmpty());
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public btnFilter(filter: any) {
    const filters = filter.split('&');
    if (Array.isArray(filters) && filters.length && 1<filters.length) {
      for (let f = 0; f < filters.length; f++) {
        const _filter = getBtnFilter(filters[f]);
        if (_filter.field==='id') this.title = _filter.value!='' ? ' ➠ ' + _filter.value : _filter.value;
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

  public onTransactionById: EmitType<object> = () => {
  }

  public offTransactionById: EmitType<object> = () => {
  }

  public selectTransactionById(transactionId: any) {
    this.apiService.findTransactions({'transactionId': transactionId})
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const transaction: any = data.content[i];
            const entity: any = dtoToTransaction(transaction);
            this.selectedTransaction = entity;
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });
    document.getElementById('viewTransaction').style.display = 'block';
    this.isModalViewTransaction = true;
    this.viewTransaction.show();
  }
}
