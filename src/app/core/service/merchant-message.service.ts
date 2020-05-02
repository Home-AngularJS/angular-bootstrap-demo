import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { MerchantModel, dtoToMerchant, dtoToFilterMerchant, getBtnFilters, FilterMerchant } from '../model/merchant-message.model';
import { MerchantMessageDataSource } from './merchant-message.datasource';
import { MerchantMessageRest } from './merchant-message.rest';
import { MerchantMessageDefaultSettings } from './merchant-message-default.settings';
import { ApiService } from './api.service';
import { DataService } from './data.service';
import { dtoToMerchantMessage } from '../model/message.model';

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
export class MerchantMessageService {
  public dataSource: MerchantMessageDataSource;
  merchants: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;
  merchantMessageIds: any = [];

  constructor(private rest: MerchantMessageRest, private defaultSettings: MerchantMessageDefaultSettings, private route: ActivatedRoute, public dataService: DataService) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new MerchantMessageDataSource(this.rest);

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
      this.merchants.data = [];
        for (let i = 0; i < data.length; i++) this.merchants.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.merchants.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.merchants) )
    //////////
    // console.log( JSON.stringify(this.merchants.data) )

    let checkeds = 0;
    const merchants: any = [];
    let merchantMessages = this.dataService.getMerchantMessages()
    for (let i = 0; i < this.merchants.data.length; i++) {
      const merchant: any = this.merchants.data[i];
      // console.log( JSON.stringify(merchant.value) )
      var entity: any = dtoToMerchant(merchant.value);
      entity.checked = (this.getMerchantMessageIds('merchantMessage', merchantMessages).indexOf(entity.merchantId) > -1) ? true : false //TODO:  https://stackoverflow.com/questions/42790602/how-do-i-check-whether-an-array-contains-a-string-in-typescript
      if (entity.checked) checkeds++
      merchants.push(entity);
    }
    this.merchants.data = merchants;
    //////////
    merchantMessages = this.getUpdateMerchantMessage(merchants);
    await wait(75)
    const allInputs = merchantMessages.length
    this.dataService.messageAll.merchant.allInputs = allInputs;
    const merchantMessageAll = (merchants.length === checkeds) ? true : false;
    this.dataService.pageMessageAll.merchant.checked = merchantMessageAll;
    //////////
    return this.merchants;
  }

  private getMerchantMessageIds(messageItemName, merchantMessages) {
    const merchantMessageIds: any = [];
    for (var m = 0; m < merchantMessages.length; m++) {
      if (merchantMessages[m].notifyAction !== null) {
        if (merchantMessages[m].notifyAction[messageItemName].value[0].checked) {
          const merchantMessage = merchantMessages[m].notifyAction[messageItemName].value[0];
          merchantMessageIds.push(merchantMessage.message);
        }
      }
    }
    return merchantMessageIds;
  }

  private getUpdateMerchantMessage(merchants) {
    const merchantMessages: any = [];
    for (let i = 0; i < merchants.length; i++) merchantMessages.push(dtoToMerchantMessage(merchants[i]));
    this.dataService.updateMerchantMessage(merchantMessages);
    return this.dataService.getMerchantMessages();
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
