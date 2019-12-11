import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterTerminal, ResultTerminalModel } from '../model/terminal.model';
import { ApiService } from '../../core/service/api.service';

@Injectable()
export class Terminal2Rest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterTerminal = null,
                         sortPointer = 'terminalId',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultTerminalModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          // params = params.append('merchantId', filter.merchantId);
          // params = params.append('mcc', filter.mcc);
          // params = params.append('merchantLegalName', filter.merchantLegalName);
          // params = params.append('merchantLocation', filter.merchantLocation);
          // params = params.append('merchantName', filter.merchantName);
          // params = params.append('bank.name', filter.bankName);

          return this.http.get(this.apiService.terminalUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
