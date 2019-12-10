import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MerchantModel, FilterMerchant } from '../model/merchant.model';
import { Terminal2Rest } from './terminal2.rest';

export class Terminal2DataSource implements DataSource<MerchantModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<MerchantModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: Terminal2Rest) {}

    load(filter: FilterMerchant,
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

    connect(collectionViewer: CollectionViewer): Observable<MerchantModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
