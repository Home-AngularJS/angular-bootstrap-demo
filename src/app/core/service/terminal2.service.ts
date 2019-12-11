import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { TerminalModel, dtoToTerminal, dtoToFilterTerminal, getBtnFilters, FilterTerminal } from '../model/terminal.model';
import { Terminal2DataSource } from './terminal2.datasource';
import { Terminal2Rest } from './terminal2.rest';
import { Terminal2DefaultSettings } from './terminal2-default.settings';
import {ApiService} from './api.service';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<TerminalModel>[];
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

  constructor(private rest: Terminal2Rest, private defaultSettings: Terminal2DefaultSettings, private route: ActivatedRoute, private apiService: ApiService) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new Terminal2DataSource(this.rest);

    this.filter = dtoToFilterTerminal(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const terminalId = params['terminalId'];
        if (terminalId===undefined) {
        } else {
          this.filter.terminalId = terminalId;
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
      var entity: any = dtoToTerminal(terminal.value);
      this.apiService.findDeviceByTerminalId(entity.terminalId)
        .subscribe( data => {
            const device: any = data;
            entity.deviceName = device.deviceName;
            terminals.push(entity);
          });
    }
    this.terminals.data = terminals;
    //////////
    return this.terminals;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.terminalId==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='terminalId') filter.terminalId = btnFilter.value;
  }
}
