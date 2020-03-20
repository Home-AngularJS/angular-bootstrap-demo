import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MessageModel, FilterMessage } from '../model/message.model';
import { MessageRest } from './message.rest';

export class MessageDataSource implements DataSource<MessageModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<MessageModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: MessageRest) {}

    load(filter: FilterMessage,
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

    connect(collectionViewer: CollectionViewer): Observable<MessageModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
