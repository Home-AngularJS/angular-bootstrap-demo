import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { MessageTemplateModel, dtoToMessageTemplate, dtoToFilterMessageTemplate, getBtnFilters, FilterMessageTemplate } from '../model/message-template.model';
import { MessageTemplateDataSource } from './message-template.datasource';
import { MessageTemplateRest } from './message-template.rest';
import { MessageTemplateDefaultSettings } from './message-template-default.settings';

interface Summary {
  page: number;
  size: number;
  filteredCount: number;
}

interface ServerResult {
  data: DisplayedItem<MessageTemplateModel>[];
  summary: Summary;
}

const wait = (time = 2000) => new Promise(resolve => {
  setTimeout(() => resolve(), time);
});

@Injectable({
  providedIn: 'root',
})
export class MessageTemplateService {
  public dataSource: MessageTemplateDataSource;
  messageTemplates: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };
  public filter;

  constructor(private rest: MessageTemplateRest, private defaultSettings: MessageTemplateDefaultSettings, private route: ActivatedRoute) {}

  async query(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    // console.log( JSON.stringify(tableState) )

    this.dataSource = new MessageTemplateDataSource(this.rest);

    this.filter = dtoToFilterMessageTemplate(tableState.filter);
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
      this.messageTemplates.data = [];
        for (let i = 0; i < data.length; i++) this.messageTemplates.data.push({ 'index': i, 'value': data[i] });

        this.dataSource.totalSubject.subscribe(filteredCount => {
          this.messageTemplates.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.merchants) )
    //////////
    // console.log( JSON.stringify(this.merchants.data) )

    const messageTemplates: any = [];
    for (let i = 0; i < this.messageTemplates.data.length; i++) {
      const messageTemplate: any = this.messageTemplates.data[i];
      // console.log( JSON.stringify(registration.value) )
      var entity: any = dtoToMessageTemplate(messageTemplate.value);
      messageTemplates.push(entity);
    }
    this.messageTemplates.data = messageTemplates;
    //////////
    return this.messageTemplates;
  }

  resetBtnFilters(filter: any, tableState: TableState) {
    if (filter.id==='' && filter.text==='') tableState.filter = {};
  }

  setBtnFilters(filter: any, btnFilters: any[]) {
    for (let f = 0; f < btnFilters.length; f++) this.setBtnFilter(filter, btnFilters[f]);
  }

  private setBtnFilter(filter: any, btnFilter: any) {
    if (btnFilter.field==='id') filter.id = btnFilter.value;
    if (btnFilter.field==='text') filter.text = btnFilter.value;
  }
}
