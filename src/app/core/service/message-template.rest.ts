import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterMessageTemplate, ResultMessageTemplateModel } from '../model/message-template.model';
import { ApiService } from './api.service';

@Injectable()
export class MessageTemplateRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterMessageTemplate = null,
                         sortPointer = 'id',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultMessageTemplateModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('id', filter.id);
          params = params.append('text', filter.text);

          return this.http.get(this.apiService.messageTemplateUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
