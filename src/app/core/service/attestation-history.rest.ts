import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttestationModel, ResultAttestationModel } from '../model/attestation.model';

@Injectable()
export class AttestationHistoryRest {
  constructor(private http: HttpClient) {}

  host = 'https://192.168.1.124:9000';
  attestationUrl: string = this.host + '/api/v1/attestation';

  findAttestationHistory(filter = '',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<AttestationModel[]> {
          return this.http.get(this.attestationUrl, {
              params: new HttpParams()
                  // .set('filter', filter)
                .set('page', pageNumber.toString())
                .set('size', pageSize.toString())
                .set('sort', 'id,' + sortOrder)
              }).pipe(
                  map(res => res['content'])
                  // map(res => {
                  //   return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  // })
              );
    }
}
