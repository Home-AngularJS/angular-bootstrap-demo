import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { RegistrationModel, dtoToRegistration, dtoToFilterRegistration, getBtnFilters, FilterRegistration } from '../model/registration.model';
import { RegistrationDataSource } from './registration.datasource';
import { RegistrationRest } from './registration.rest';
import { RegistrationDefaultSettings } from './registration-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<RegistrationModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  public dataSource: RegistrationDataSource;
  registrations: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: RegistrationRest, private defaultSettings: RegistrationDefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new RegistrationDataSource(this.rest);

    this.filter = dtoToFilterRegistration(tableState.filter);
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
      this.registrations.data = [];
        for (let i = 0; i < data.length; i++) this.registrations.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.registrations.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.merchants) )
    //////////
    // console.log( JSON.stringify(this.merchants.data) )

    const registrations: any = [];
    for (let i = 0; i < this.registrations.data.length; i++) {
      const registration: any = this.registrations.data[i];
      // console.log( JSON.stringify(registration.value) )
      var entity: any = dtoToRegistration(registration.value);
      registrations.push(entity);
    }
    this.registrations.data = registrations;
    //////////
    return this.registrations;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.id==='' && filter.userLogin==='' && filter.merchantId==='' && filter.phoneNumber==='' && filter.mcc==='' && filter.merchantLocation==='' && filter.merchantName==='' && filter.startRegistrationDate==='' && filter.endRegistrationDate==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='id') filter.id = btnFilter.value;
    if (btnFilter.field==='userLogin') filter.userLogin = btnFilter.value;
    if (btnFilter.field==='merchantId') filter.merchantId = btnFilter.value;
    if (btnFilter.field==='phoneNumber') filter.phoneNumber = btnFilter.value;
    if (btnFilter.field==='mcc') filter.mcc = btnFilter.value;
    if (btnFilter.field==='merchantLocation') filter.merchantLocation = btnFilter.value;
    if (btnFilter.field==='merchantName') filter.merchantName = btnFilter.value;
    if (btnFilter.field==='startRegistrationDate') filter.startRegistrationDate = btnFilter.value;
    if (btnFilter.field==='endRegistrationDate') filter.endRegistrationDate = btnFilter.value;
  }
}
