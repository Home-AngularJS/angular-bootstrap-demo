import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs/index';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { TableState, DisplayedItem } from 'smart-table-ng';
import { dtoToFilterUser, UsersModel} from '../model/users.model';
import { AttestationModel, ResultAttestationModel } from '../model/attestation.model';
import { AttestationHistoryDataSource } from './attestation-history.datasource';
import { AttestationHistoryRest } from './attestation-history.rest';

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
  attestationHistories: ServerResult;

  constructor(private attestationHistoryRest: AttestationHistoryRest) {}

  async queryAttestationHistory(tableState: TableState) {
    const filterReq = Object.assign({}, tableState, { slice: { page: 1 } });
    console.log( JSON.stringify(tableState) )

    this.attestationHistorySource = new AttestationHistoryDataSource(this.attestationHistoryRest);

      // let filter: any = dtoToFilterUser(tableState.filter)
      // console.log(filter);

    this.attestationHistorySource.loadAttestationHistory('', tableState.sort.direction, tableState.slice.page-1, 10);
    this.attestationHistorySource.attestationHistorySubject.subscribe(data => {
      var _data = [];
      for (let i = 0; i < data.length; i++) {
          _data.push({
          'index': i,
          'value': data[i]
        })
      }
      this.attestationHistories = {
          data: _data,
          summary: { page: tableState.slice.page, size: tableState.slice.size, filteredCount: 33 } // { page: tableState.slice.page, size: tableState.slice.size, filteredCount: next.length }
      };
    });
    await wait(500);

    // console.log( JSON.stringify(this.attestationHistories) )
    return this.attestationHistories;
  }
}
