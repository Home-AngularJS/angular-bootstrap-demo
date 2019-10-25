import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import {dtoToFilterUser, UsersModel} from '../model/users.model';
import { UsersRest } from "./users.rest";
import { UsersDataSource } from "./users.datasource";

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<UsersModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersDataSource: UsersDataSource;
  users: ServerResult;

  constructor(private usersRest: UsersRest) {}

  async queryUsers(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    console.log( JSON.stringify(tableState) )

    this.usersDataSource = new UsersDataSource(this.usersRest);
    // this.usersDataSource.loadUsers(tableState.filter, tableState.sort.direction, tableState.slice.page-1, 10);


      let filter: any = dtoToFilterUser(tableState.filter)
      console.log(filter);

    this.usersDataSource.loadUsers( JSON.stringify(filter), tableState.sort.direction, tableState.slice.page-1, 10);
    this.usersDataSource.usersSubject.subscribe(data => {
      var _data = [];
      for (let i = 0; i < data.length; i++) {
          _data.push({
          'index': i,
          'value': data[i]
        })
      }
      this.users = {
          data: _data,
          summary: { page: tableState.slice.page, size: tableState.slice.size, filteredCount: 33 } // { page: tableState.slice.page, size: tableState.slice.size, filteredCount: next.length }
      };
    });
    await wait(Math.floor(Math.random() * 1000));

    // console.log( JSON.stringify(this.users) )
    return this.users;
  }
}
