import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { AttestationModel, dtoToFilterAttestationHistory, getBtnFilters } from '../model/attestation.model';
import { Transaction2DataSource } from './transaction2.datasource';
import { Transaction2Rest } from './transaction2.rest';
import { Transaction2DefaultSettings } from './transaction2-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<AttestationModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class Transaction2Service {
  dataSource: Transaction2DataSource;
  transactions: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: Transaction2Rest, private defaultSettings: Transaction2DefaultSettings, private route: ActivatedRoute, private router: Router) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new Transaction2DataSource(this.rest);

    this.filter = dtoToFilterAttestationHistory(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const deviceSn = params['deviceSn'];
        if (deviceSn===undefined) {
        } else {
          this.filter.deviceSn = deviceSn;
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
    return this.transactions;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.deviceSn==='' && filter.deviceName==='' && filter.attestationPhase==='' && filter.date==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='deviceSn') filter.deviceSn = btnFilter.value;
    if (btnFilter.field==='deviceName') filter.deviceName = btnFilter.value;
    if (btnFilter.field==='attestationPhase') filter.attestationPhase = btnFilter.value;
    if (btnFilter.field==='date') filter.date = btnFilter.value;
  }
}
