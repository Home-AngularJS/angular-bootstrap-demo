import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttestationModel, ResultAttestationModel } from '../model/attestation.model';
import { AttestationHistoryRest } from './attestation-history.rest';

export class AttestationHistoryDataSource implements DataSource<AttestationModel> {
    public attestationHistorySubject = new BehaviorSubject<AttestationModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private attestationHistoryRest: AttestationHistoryRest) {}

    loadAttestationHistory(filter: string,
              sortDirection: string,
              pageIndex: number,
              pageSize: number) {
        this.loadingSubject.next(true);

        this.attestationHistoryRest.findAttestationHistory(filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe(attestationHistories => this.attestationHistorySubject.next(attestationHistories));
    }

    connect(collectionViewer: CollectionViewer): Observable<AttestationModel[]> {
        console.log("Connecting data source");
        return this.attestationHistorySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.attestationHistorySubject.complete();
        this.loadingSubject.complete();
    }
}
