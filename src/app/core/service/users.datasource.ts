import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UsersModel } from "../model/users.model";
import { UsersRest } from "./users.rest";

export class UsersDataSource implements DataSource<UsersModel> {
    public usersSubject = new BehaviorSubject<UsersModel[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    constructor(private usersRest: UsersRest) {}

    loadUsers(filter: string,
              sortDirection: string,
              pageIndex: number,
              pageSize: number) {
        this.loadingSubject.next(true);

        this.usersRest.findUsers(filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)))
            .subscribe(users => this.usersSubject.next(users));
    }

    connect(collectionViewer: CollectionViewer): Observable<UsersModel[]> {
        console.log("Connecting data source");
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }
}
