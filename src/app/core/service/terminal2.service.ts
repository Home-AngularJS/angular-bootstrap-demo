import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { MerchantModel, dtoToMerchant, dtoToFilterMerchant, getBtnFilters, FilterMerchant } from '../model/merchant.model';
import { Terminal2DataSource } from './terminal2.datasource';
import { Terminal2Rest } from './terminal2.rest';
import { Terminal2DefaultSettings } from './terminal2-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<MerchantModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class Terminal2Service {
  public dataSource: Terminal2DataSource;
  terminals: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: Terminal2Rest, private defaultSettings: Terminal2DefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new Terminal2DataSource(this.rest);

    this.filter = dtoToFilterMerchant(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const merchantId = params['merchantId'];
        if (merchantId===undefined) {
        } else {
          this.filter.merchantId = merchantId;
        }
      });

    console.log(this.filter);

    this.dataSource.load(this.filter, tableState.sort.pointer, tableState.sort.direction, tableState.slice.page-1, this.defaultSettings.slice.size);
    this.dataSource.subject.subscribe(data => {
      this.terminals.data = [];
        for (let i = 0; i < data.length; i++) this.terminals.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.terminals.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.terminals) )
    //////////
    // console.log( JSON.stringify(this.terminals.data) )

    const terminals: any = [];
    for (let i = 0; i < this.terminals.data.length; i++) {
      const terminal: any = this.terminals.data[i];
      // console.log( JSON.stringify(terminal.value) )
      var entity: any = dtoToMerchant(terminal.value);
      terminals.push(entity);
    }
    this.terminals.data = terminals;
    //////////
    return this.terminals;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.merchantId==='' && filter.mcc==='' && filter.merchantLegalName==='' && filter.merchantLocation==='' && filter.merchantName==='' && filter.bankName==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='merchantId') filter.merchantId = btnFilter.value;
    if (btnFilter.field==='mcc') filter.mcc = btnFilter.value;
    if (btnFilter.field==='merchantLegalName') filter.merchantLegalName = btnFilter.value;
    if (btnFilter.field==='merchantLocation') filter.merchantLocation = btnFilter.value;
    if (btnFilter.field==='merchantName') filter.merchantName = btnFilter.value;
    if (btnFilter.field==='bankName') filter.bankName = btnFilter.value;
  }
}
