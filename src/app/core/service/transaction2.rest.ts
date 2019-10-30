import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterAttestationHistory, ResultAttestationModel } from '../model/attestation.model';

@Injectable()
export class Transaction2Rest {
  constructor(private http: HttpClient) {}

  host = 'https://192.168.1.124:9000';
  attestationUrl: string = this.host + '/api/v1/attestation';

  findAttestationHistory(filter: FilterAttestationHistory = null,
                         sortPointer = 'date',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultAttestationModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          var params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('deviceSn', filter.deviceSn);
          params = params.append('deviceName', filter.deviceName);
          params = params.append('attestationPhase', filter.attestationPhase);
          params = params.append('date', filter.date);

          return this.http.get(this.attestationUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
