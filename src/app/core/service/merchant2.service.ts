import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { AttestationModel, dtoToAttestationHistory, dtoToFilterAttestationHistory, getBtnFilters } from '../model/merchant2.model';
import { Merchant2DataSource } from './merchant2.datasource';
import { Merchant2Rest } from './merchant2.rest';
import { Merchant2DefaultSettings } from './merchant2-default.settings';

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
export class Merchant2Service {
  dataSource: Merchant2DataSource;
  attestationHistories: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: Merchant2Rest, private defaultSettings: Merchant2DefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new Merchant2DataSource(this.rest);

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
      this.attestationHistories.data = [];
        for (let i = 0; i < data.length; i++) this.attestationHistories.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.attestationHistories.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.attestationHistories) )
    //////////
    // console.log( JSON.stringify(this.attestationHistories.data) )

    const attestationHistories: any = [];
    for (let i = 0; i < this.attestationHistories.data.length; i++) {
      const attestationHistory: any = this.attestationHistories.data[i];
      // console.log( JSON.stringify(attestationHistory.value) )
      var entity: any = dtoToAttestationHistory(attestationHistory.value);
      attestationHistories.push(entity);
    }
    this.attestationHistories.data = attestationHistories;
    //////////
    return this.attestationHistories;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.deviceSn==='' && filter.terminalId==='' && filter.deviceName==='' && filter.attestationPhase==='' && filter.date===''
      && filter.integrity==='' && filter.root==='' && filter.debug==='' && filter.emulator==='' && filter.geoPosition==='' && filter.velocity==='' && filter.channelIntegrity==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='deviceSn') filter.deviceSn = btnFilter.value;
    if (btnFilter.field==='terminalId') filter.terminalId = btnFilter.value;
    if (btnFilter.field==='deviceName') filter.deviceName = btnFilter.value;
    if (btnFilter.field==='attestationPhase') filter.attestationPhase = btnFilter.value;
    if (btnFilter.field==='date') filter.date = btnFilter.value;
    if (btnFilter.field==='integrity') filter.integrity = btnFilter.value;
    if (btnFilter.field==='root') filter.root = btnFilter.value;
    if (btnFilter.field==='debug') filter.debug = btnFilter.value;
    if (btnFilter.field==='emulator') filter.emulator = btnFilter.value;
    if (btnFilter.field==='geoPosition') filter.geoPosition = btnFilter.value;
    if (btnFilter.field==='velocity') filter.velocity = btnFilter.value;
    if (btnFilter.field==='channelIntegrity') filter.channelIntegrity = btnFilter.value;
  }
}
