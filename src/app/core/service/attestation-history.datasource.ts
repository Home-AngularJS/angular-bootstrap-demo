import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttestationModel, FilterAttestationHistory } from '../model/attestation.model';
import { AttestationHistoryRest } from './attestation-history.rest';

export class AttestationHistoryDataSource implements DataSource<AttestationModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public attestationHistorySubject = new BehaviorSubject<AttestationModel[]>([]);
    public totalAttestationHistorySubject = new BehaviorSubject<string>(null);

    constructor(private attestationHistoryRest: AttestationHistoryRest) {}

    loadAttestationHistory(filter: FilterAttestationHistory,
                           sortPointer: string,
                           sortDirection: string,
                           pageIndex: number,
                           pageSize: number) {
        this.loadingSubject.next(true);

        this.attestationHistoryRest.findAttestationHistory(filter, sortPointer, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe(attestationHistories => {
              this.totalAttestationHistorySubject.next(attestationHistories['totalElements']);
              this.attestationHistorySubject.next(attestationHistories['content']);
            });
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
