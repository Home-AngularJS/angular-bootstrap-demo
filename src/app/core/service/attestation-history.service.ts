import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { dtoToFilterAttestationHistory, AttestationModel} from '../model/attestation.model';
import { AttestationHistoryDataSource } from './attestation-history.datasource';
import { AttestationHistoryRest } from './attestation-history.rest';
import { AttestationHistoryDefaultSettings } from './attestation-history-default.settings';

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
export class AttestationHistoryService {
  attestationHistorySource: AttestationHistoryDataSource;
  attestationHistories: ServerResult = { data: [], summary: {page: 0, size: 0, filteredCount: 0} };

  constructor(private attestationHistoryRest: AttestationHistoryRest, private defaultSettings: AttestationHistoryDefaultSettings) {}

  async queryAttestationHistory(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    console.log( JSON.stringify(tableState) )

    this.attestationHistorySource = new AttestationHistoryDataSource(this.attestationHistoryRest);

    const filter: any = dtoToFilterAttestationHistory(tableState.filter);
    const deviceSnFilter = this.filterByDeviceSn(tableState.filter);
    if (deviceSnFilter!='') filter.deviceSn = deviceSnFilter;
    console.log(filter);

    this.attestationHistorySource.loadAttestationHistory(filter, tableState.sort.pointer, tableState.sort.direction, tableState.slice.page-1, this.defaultSettings.slice.size);
    this.attestationHistorySource.attestationHistorySubject.subscribe(data => {
      this.attestationHistories.data = [];
        for (let i = 0; i < data.length; i++) this.attestationHistories.data.push({ 'index': i, 'value': data[i] });

        this.attestationHistorySource.totalAttestationHistorySubject.subscribe(filteredCount => {
          this.attestationHistories.summary = { page: tableState.slice.page, size: tableState.slice.size, filteredCount: parseInt(filteredCount) };
        });
    });

    await wait(500);

    // console.log( JSON.stringify(this.attestationHistories) )
    return this.attestationHistories;
  }

  private filterByDeviceSn(filter: any) {
    let strFilter: string = JSON.stringify(filter).toString();
    strFilter = strFilter.replace('"}],"":', '"}],"onlyDeviceSn":');
    let _filter = JSON.parse(strFilter);
    let _onlyDeviceSn = _filter.onlyDeviceSn===undefined ? [] : _filter.onlyDeviceSn;
    return (Array.isArray(_onlyDeviceSn) && _onlyDeviceSn.length) ? _onlyDeviceSn[0].value : '';
  }
}
