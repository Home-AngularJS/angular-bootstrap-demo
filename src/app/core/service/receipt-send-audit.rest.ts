import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterReceiptSendAudit, ResultReceiptSendAuditModel } from '../model/receipt-send-audit.model';
import { ApiService } from './api.service';

@Injectable()
export class ReceiptSendAuditRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  url: string = this.apiService.host + '/api/v1/receipt-send-audits';

  find(filter: FilterReceiptSendAudit = null,
                         sortPointer = 'receiptNumber',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultReceiptSendAuditModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          var params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);

          if (filter.receiptNumber!=null && filter.receiptNumber!='' && 2<filter.receiptNumber.length) params = params.append('receiptNumber', filter.receiptNumber);
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
