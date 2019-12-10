import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterTransaction, ResultTransactionModel } from '../model/transaction.model';

@Injectable()
export class TransactionRest {
  constructor(private http: HttpClient) {}

  host = 'http://192.168.1.124:9000';
  // host = 'https://192.168.1.124:9000';
  // host = 'https://map1.mobo.cards:8093';
  // host = 'https://192.168.1.124:9001';
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
          if (filter.transactionId!=null && filter.transactionId!='' && 2<filter.transactionId.length) params = params.append('transactionId', filter.transactionId);
          if (filter.panMasked!=null && filter.panMasked!='' && 2<filter.panMasked.length) params = params.append('panMasked', filter.panMasked);
          if (filter.approvalCode!=null && filter.approvalCode!='' && 2<filter.approvalCode.length) params = params.append('approvalCode', filter.approvalCode);
          if (filter.rrn!=null && filter.rrn!='' && 2<filter.rrn.length) params = params.append('rrn', filter.rrn);
          if (filter.terminalId!=null && filter.terminalId!='' && 2<filter.terminalId.length) params = params.append('terminalId', filter.terminalId);

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
