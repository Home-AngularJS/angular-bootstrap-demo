import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterTransaction, ResultTransactionModel } from '../model/transaction.model';

@Injectable()
export class Transaction2Rest {
  constructor(private http: HttpClient) {}

  host = 'https://192.168.1.124:9000';
  url: string = this.host + '/api/v1/transactions';

  find(filter: FilterTransaction = null,
                         sortPointer = 'transactionId',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultTransactionModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          var params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          // params = params.append('deviceSn', filter.deviceSn);
          // params = params.append('deviceName', filter.deviceName);
          // params = params.append('attestationPhase', filter.attestationPhase);
          // params = params.append('date', filter.date);

          return this.http.get(this.url, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
