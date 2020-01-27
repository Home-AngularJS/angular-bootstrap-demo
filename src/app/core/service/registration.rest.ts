import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterRegistration, ResultRegistrationModel } from '../model/registration.model';
import { ApiService } from './api.service';

@Injectable()
export class RegistrationRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterRegistration = null,
                         sortPointer = 'merchantId',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultRegistrationModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('merchantId', filter.merchantId);
          params = params.append('mcc', filter.mcc);
          params = params.append('merchantLocation', filter.merchantLocation);
          params = params.append('merchantName', filter.merchantName);

          return this.http.get(this.apiService.registrationUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
