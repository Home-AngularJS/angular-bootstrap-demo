import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ReceiptSendAuditModel, FilterReceiptSendAudit } from '../model/receipt-send-audit.model';
import { ReceiptSendAuditRest } from './receipt-send-audit.rest';

export class ReceiptSendAuditDataSource implements DataSource<ReceiptSendAuditModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<ReceiptSendAuditModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: ReceiptSendAuditRest) {}

    load(filter: FilterReceiptSendAudit,
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

    connect(collectionViewer: CollectionViewer): Observable<ReceiptSendAuditModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
