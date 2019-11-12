import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { filterTransactionFormEmpty, getBtnFilter } from '../../core/model/transaction.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { Transaction2Service } from '../../core/service/transaction2.service';
import { Transaction2DefaultSettings } from '../../core/service/transaction2-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import {dtoToTerminal} from '../../core/model/terminal.model';

const providers = [{
  provide: SmartTable,
  useFactory: (service: Transaction2Service, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [Transaction2Service, Transaction2DefaultSettings]
}];

@Component({
  selector: 'app-transaction2',
  templateUrl: './transaction2.component.html',
  styleUrls: ['./transaction2.component.css'],
  providers
})
export class Transaction2Component implements OnInit {
  selectedTerminal;
  takeChoices: any;
  filterForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };
  @ViewChild('viewTerminal') viewTerminal: DialogComponent;
  isModalViewTerminal: Boolean = false;
  @ViewChild('viewReceiptNumber') viewReceiptNumber: DialogComponent;
  isModalViewReceiptNumber: Boolean = false;
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: Transaction2Service) { }

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
                  // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
                });
            this.selectedTerminal = entity;
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
    document.getElementById('viewTerminal').style.display = 'block';
    this.isModalViewTerminal = true;
    this.viewTerminal.show();
  }


  public onReceiptNumber: EmitType<object> = () => {
  }

  public offReceiptNumber: EmitType<object> = () => {
  }

  public selectReceiptNumber(receiptNumber: any) {
    document.getElementById('viewReceiptNumber').style.display = 'block';
    this.isModalViewReceiptNumber = true;
    this.viewReceiptNumber.show();
  }
}
