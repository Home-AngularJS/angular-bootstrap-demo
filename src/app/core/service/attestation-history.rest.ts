import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilterAttestationHistory, ResultAttestationModel } from '../model/attestation.model';
import { ApiService } from './api.service';

@Injectable()
export class AttestationHistoryRest {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  find(filter: FilterAttestationHistory = null,
                         sortPointer = 'date',
                         sortOrder = 'asc',
                         pageNumber = 0,
                         pageSize = 10):  Observable<ResultAttestationModel> {

          /* http://qaru.site/questions/196180/why-httpparams-doesnt-work-in-multiple-line-in-angular-43 */
          let params = new HttpParams();
          params = params.append('page', pageNumber.toString());
          params = params.append('size', pageSize.toString());
          params = params.append('sort', sortPointer + ',' + sortOrder);
          params = params.append('deviceSn', filter.deviceSn);
          params = params.append('terminalId', filter.terminalId);
          params = params.append('deviceName', filter.deviceName);
          params = params.append('attestationPhase', filter.attestationPhase);
          params = params.append('date', filter.date);
          params = params.append('startDate', filter.startDate);
          params = params.append('endDate', filter.endDate);
          params = params.append('integrity', filter.integrity);
          params = params.append('root', filter.root);
          params = params.append('debug', filter.debug);
          params = params.append('emulator', filter.emulator);
          params = params.append('geoPosition', filter.geoPosition);
          params = params.append('velocity', filter.velocity);
          params = params.append('channelIntegrity', filter.channelIntegrity);

          return this.http.get(this.apiService.attestationUrl, {
                params: params
              }).pipe(
                  // map(res => res['content'])
                  map(res => {
                    return { 'content': res['content'], 'totalElements': res['totalElements'] };
                  })
              );
    }
}
