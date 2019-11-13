import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterReceiptSendAudit, ResultReceiptSendAuditModel } from '../model/receipt-send-audit.model';

@Injectable()
export class ReceiptSendAuditRest {
  constructor(private http: HttpClient) {}

  host = 'https://192.168.1.124:9000';
  url: string = this.host + '/api/v1/receipt-send-audits';

  find(filter: FilterReceiptSendAudit = null,
                         sortPointer = 'id',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultReceiptSendAuditModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          var params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);

          if (filter.id!=null && filter.id!='' && 2<filter.id.length) params = params.append('id', filter.id);
          if (filter.transactionId!=null && filter.transactionId!='' && 2<filter.transactionId.length) params = params.append('transactionId', filter.transactionId);

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
