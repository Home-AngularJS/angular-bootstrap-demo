import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { TerminalModel, dtoToTerminal, dtoToFilterTerminal, getBtnFilters, FilterTerminal } from '../model/terminal-message.model';
import { TerminalMessageDataSource } from './terminal-message.datasource';
import { TerminalMessageRest } from './terminal-message.rest';
import { TerminalMessageDefaultSettings } from './terminal-message-default.settings';
import {ApiService} from './api.service';
import {DataService} from './data.service';

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
export class TerminalMessageService {
  public dataSource: TerminalMessageDataSource;
  terminals: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: TerminalMessageRest, private defaultSettings: TerminalMessageDefaultSettings, private route: ActivatedRoute, private apiService: ApiService, public dataService: DataService) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new TerminalMessageDataSource(this.rest);

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
      entity.checked = (this.getTerminalMessageIds().indexOf(entity.terminalId) > -1) ? true : false //TODO:  https://stackoverflow.com/questions/42790602/how-do-i-check-whether-an-array-contains-a-string-in-typescript
      this.apiService.findDeviceByTerminalId(entity.terminalId)
        .subscribe( data => {
            const device: any = data;
            entity.deviceName = device.deviceName;
            entity.deviceSn = device.deviceSn;
            terminals.push(entity);
          });
      await wait(75);
    }
    this.terminals.data = terminals;
    //////////
    return this.terminals;
  }

  private getTerminalMessageIds() {
    const terminalMessageIds: any = [];
    const terminalMessages = this.dataService.getTerminalMessages()
    for (var t = 0; t < terminalMessages.length; t++) {
      if (terminalMessages[t].notifyAction !== null) {
        if (terminalMessages[t].notifyAction['terminalMessage'].value[0].checked) {
          const terminalMessage = terminalMessages[t].notifyAction['terminalMessage'].value[0];
          terminalMessageIds.push(terminalMessage.message);
        }
      }
    }
    return terminalMessageIds;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.terminalId==='' && filter.groupNumber==='' && filter.dateTimeInit==='' && filter.merchantName==='' && filter.legalName==='' && filter.bankName==='' && filter.status==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='terminalId') filter.terminalId = btnFilter.value;
    if (btnFilter.field==='groupNumber') filter.groupNumber = btnFilter.value;
    if (btnFilter.field==='dateTimeInit') filter.dateTimeInit = btnFilter.value;
    if (btnFilter.field==='merchantName') filter.merchantName = btnFilter.value;
    if (btnFilter.field==='legalName') filter.legalName = btnFilter.value;
    if (btnFilter.field==='bankName') filter.bankName = btnFilter.value;
    if (btnFilter.field==='status') filter.status = btnFilter.value;
  }
}
