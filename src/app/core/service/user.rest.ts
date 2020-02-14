import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterUser, ResultUserModel } from '../model/user.model';
import { ApiService } from './api.service';

@Injectable()
export class UserRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterUser = null,
                         sortPointer = 'id',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultUserModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('id', filter.id);
          params = params.append('userLogin', filter.userLogin);
          params = params.append('merchantId', filter.merchantId);
          params = params.append('phoneNumber', filter.phoneNumber);
          params = params.append('mcc', filter.mcc);
          params = params.append('merchantLocation', filter.merchantLocation);
          params = params.append('merchantName', filter.merchantName);
          params = params.append('startRegistrationDate', filter.startRegistrationDate);
          params = params.append('endRegistrationDate', filter.endRegistrationDate);

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
