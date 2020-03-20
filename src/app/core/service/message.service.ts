import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { MessageModel, dtoToMessage, dtoToFilterMessage, getBtnFilters, FilterMessage } from '../model/message.model';
import { UserDataSource } from './message.datasource';
import { MessageRest } from './message.rest';
import { MessageDefaultSettings } from './message-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<MessageModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public dataSource: UserDataSource;
  users: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: MessageRest, private defaultSettings: MessageDefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new UserDataSource(this.rest);

    this.filter = dtoToFilterMessage(tableState.filter);
    this.setBtnFilters(this.filter, getBtnFilters(tableState.filter));
    this.resetBtnFilters(this.filter, tableState);

    this.route
      .queryParams
      .subscribe(params => {
        const username = params['username'];
        if (username===undefined) {
        } else {
          this.filter.username = username;
        }
      });

    console.log(this.filter);

    this.dataSource.load(this.filter, tableState.sort.pointer, tableState.sort.direction, tableState.slice.page-1, this.defaultSettings.slice.size);
    this.dataSource.subject.subscribe(data => {
      this.users.data = [];
        for (let i = 0; i < data.length; i++) this.users.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.users.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.merchants) )
    //////////
    // console.log( JSON.stringify(this.merchants.data) )

    const users: any = [];
    for (let i = 0; i < this.users.data.length; i++) {
      const user: any = this.users.data[i];
      // console.log( JSON.stringify(registration.value) )
      var entity: any = dtoToMessage(user.value);
      users.push(entity);
    }
    this.users.data = users;
    //////////
    return this.users;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.username==='' && filter.email==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='username') filter.username = btnFilter.value;
    if (btnFilter.field==='email') filter.email = btnFilter.value;
  }
}
