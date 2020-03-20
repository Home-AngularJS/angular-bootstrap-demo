import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterMessage, ResultMessageModel } from '../model/message.model';
import { ApiService } from './api.service';

@Injectable()
export class MessageRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterMessage = null,
                         sortPointer = 'username',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultMessageModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('username', filter.username);
          params = params.append('email', filter.email);

          return this.http.get(this.apiService.userUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
