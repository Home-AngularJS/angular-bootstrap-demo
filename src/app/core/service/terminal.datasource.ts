import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { TerminalModel, FilterTerminal } from '../model/terminal.model';
import { TerminalRest } from './terminal.rest';

export class TerminalDataSource implements DataSource<TerminalModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<TerminalModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: TerminalRest) {}

    load(filter: FilterTerminal,
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

    connect(collectionViewer: CollectionViewer): Observable<TerminalModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
