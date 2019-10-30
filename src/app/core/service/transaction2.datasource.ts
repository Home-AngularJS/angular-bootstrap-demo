import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AttestationModel, FilterAttestationHistory } from '../model/attestation.model';
import { Transaction2Rest } from './transaction2.rest';

export class Transaction2DataSource implements DataSource<AttestationModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<AttestationModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: Transaction2Rest) {}

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
            .subscribe(attestationHistories => {
              this.totalSubject.next(attestationHistories['totalElements']);
              this.subject.next(attestationHistories['content']);
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
