import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { TransactionModel, dtoToFilterTransaction, getBtnFilters, dtoToTransaction } from '../model/transaction.model';
import { TransactionDataSource } from './transaction.datasource';
import { TransactionRest } from './transaction.rest';
import { TransactionDefaultSettings } from './transaction-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<TransactionModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  dataSource: TransactionDataSource;
  transactions: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: TransactionRest, private defaultSettings: TransactionDefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new TransactionDataSource(this.rest);

    this.filter = dtoToFilterTransaction(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const transactionId = params['transactionId'];
        if (transactionId===undefined) {
        } else {
          this.filter.transactionId = transactionId;
        }
      });

    console.log(this.filter);

    this.dataSource.load(this.filter, tableState.sort.pointer, tableState.sort.direction, tableState.slice.page-1, this.defaultSettings.slice.size);
    this.dataSource.subject.subscribe(data => {
      this.transactions.data = [];
        for (let i = 0; i < data.length; i++) this.transactions.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.transactions.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.transactions) )
    //////////
    // console.log( JSON.stringify(this.transactions.data) )

    const transactions: any = [];
    for (let i = 0; i < this.transactions.data.length; i++) {
      const transaction: any = this.transactions.data[i];
      // console.log( JSON.stringify(transaction.value) )
      var entity: any = dtoToTransaction(transaction.value);
      transactions.push(entity);
    }
    this.transactions.data = transactions;
    //////////
    return this.transactions;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.transactionId==='' && filter.panMasked==='' && filter.approvalCode==='' && filter.rrn==='' && filter.terminalId==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='transactionId') filter.transactionId = btnFilter.value;
    if (btnFilter.field==='panMasked') filter.panMasked = btnFilter.value;
    if (btnFilter.field==='approvalCode') filter.approvalCode = btnFilter.value;
    if (btnFilter.field==='rrn') filter.rrn = btnFilter.value;
    if (btnFilter.field==='terminalId') filter.terminalId = btnFilter.value;
  }
}
