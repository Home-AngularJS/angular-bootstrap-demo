import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { ReceiptSendAuditModel, dtoToFilterReceiptSendAudit, getBtnFilters, dtoToReceiptSendAudit } from '../model/receipt-send-audit.model';
import { ReceiptSendAuditDataSource } from './receipt-send-audit.datasource';
import { ReceiptSendAuditRest } from './receipt-send-audit.rest';
import { ReceiptSendAuditDefaultSettings } from './receipt-send-audit-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<ReceiptSendAuditModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class ReceiptSendAuditService {
  dataSource: ReceiptSendAuditDataSource;
  receiptSendAudits: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: ReceiptSendAuditRest, private defaultSettings: ReceiptSendAuditDefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new ReceiptSendAuditDataSource(this.rest);

    this.filter = dtoToFilterReceiptSendAudit(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const id = params['id'];
        if (id===undefined) {
        } else {
          this.filter.id = id;
        }
      });

    console.log(this.filter);

    this.dataSource.load(this.filter, tableState.sort.pointer, tableState.sort.direction, tableState.slice.page-1, this.defaultSettings.slice.size);
    this.dataSource.subject.subscribe(data => {
      this.receiptSendAudits.data = [];
        for (let i = 0; i < data.length; i++) this.receiptSendAudits.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.receiptSendAudits.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.receiptSendAudits) )
    //////////
    // console.log( JSON.stringify(this.receiptSendAudits.data) )

    const receiptSendAudits: any = [];
    for (let i = 0; i < this.receiptSendAudits.data.length; i++) {
      const receiptSendAudit: any = this.receiptSendAudits.data[i];
      // console.log( JSON.stringify(receiptSendAudit.value) )
      var entity: any = dtoToReceiptSendAudit(receiptSendAudit.value);
      receiptSendAudits.push(entity);
    }
    this.receiptSendAudits.data = receiptSendAudits;
    //////////
    return this.receiptSendAudits;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.id==='' && filter.transactionId==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='id') filter.id = btnFilter.value;
    if (btnFilter.field==='transactionId') filter.transactionId = btnFilter.value;
  }
}
