import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterMerchant, ResultMerchantModel } from '../model/merchant.model';

@Injectable()
export class Merchant2Rest {
  constructor(private http: HttpClient) {}

  host = 'https://192.168.1.124:9000';
  // host = 'https://192.168.1.124:9001';
  url: string = this.host + '/api/v1/merchants';

  find(filter: FilterMerchant = null,
                         sortPointer = 'merchantId',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultMerchantModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);

          params = params.append('merchantId', filter.shortMerchantId);
    params = params.append('merchantId', filter.mcc);
    params = params.append('merchantId', filter.merchantLegalName);
    params = params.append('merchantId', filter.merchantLocation);
    params = params.append('merchantId', filter.merchantName);
    params = params.append('merchantId', filter.bankName);

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
