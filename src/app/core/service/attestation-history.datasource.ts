import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttestationModel, FilterAttestationHistory } from '../model/attestation.model';
import { AttestationHistoryRest } from './attestation-history.rest';

export class AttestationHistoryDataSource implements DataSource<AttestationModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<AttestationModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: AttestationHistoryRest) {}

    load(filter: FilterAttestationHistory,
                           sortPointer: string,
                           sortDirection: string,
                           pageIndex: number,
                           pageSize: number) {
        this.loadingSubject.next(true);

        this.rest.find(filter, sortPointer, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe(elements => {
              this.totalSubject.next(elements['totalElements']);
              this.subject.next(elements['content']);
            });
    }

    connect(collectionViewer: CollectionViewer): Observable<AttestationModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
