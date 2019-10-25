import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersModel } from "../model/users.model";

@Injectable()
export class UsersRest {
    constructor(private http: HttpClient) {}

    findUsers(filter = '',
              sortOrder = 'asc',
              pageNumber = 0,
              pageSize = 10):  Observable<UsersModel[]> {
            return this.http.get('http://localhost:9000/api/users', {
                params: new HttpParams()
                    .set('filter', filter)
                    .set('sortOrder', sortOrder)
                    .set('pageNumber', pageNumber.toString())
                    .set('pageSize', pageSize.toString())
                }).pipe(
                    map(res =>  res['payload'])
                );
      }
}
