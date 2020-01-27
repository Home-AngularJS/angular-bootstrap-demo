import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { RegistrationModel, FilterRegistration } from '../model/registration.model';
import { RegistrationRest } from './registration.rest';

export class RegistrationDataSource implements DataSource<RegistrationModel> {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public subject = new BehaviorSubject<RegistrationModel[]>([]);
    public totalSubject = new BehaviorSubject<string>(null);

    constructor(private rest: RegistrationRest) {}

    load(filter: FilterRegistration,
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

    connect(collectionViewer: CollectionViewer): Observable<RegistrationModel[]> {
        console.log("Connecting data source");
        return this.subject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.subject.complete();
        this.loadingSubject.complete();
    }
}
