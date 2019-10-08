import { Component, Input } from '@angular/core';
import { BehaviorSubject, fromEvent, merge } from 'rxjs';
import { map, filter, debounceTime, distinct, tap, flatMap } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';


@Component({
  selector: 'infinite-scroll-list',
  template: `
    <table>
      <tbody>
        <tr *ngFor="let terminal of terminals$ | async"
          [style.height]="itemHeight + 'px'">
            <td> {{ terminal.terminalId }} </td>
            <td> {{ terminal.groupNumber }} </td>
            <td> <span style="margin-left: -25px; padding-right: 21px;">{{ terminal.dateTimeInit | date : 'dd.MM.yyyy hh:mm' }}</span> </td>
            <td> <div style="margin-top:5px; max-width:190px; height:auto; word-wrap:break-word; font-family:monospace; font-size:12px; line-height:10px;">{{ terminal.merchant.merchantName }}</div> </td>
            <td> {{ terminal.merchant.merchantLegalName }} </td>
            <td> {{ terminal.merchant.bank.name }} </td>
<!--            <td> {{ terminal.deviceName }} </td>-->
        </tr>
      </tbody>
    </table>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class InfiniteScrollListComponent {
  private cache = [];
  private pageByManual$ = new BehaviorSubject(1);
  private itemHeight = 50;
  private numberOfItems = 10;
  private pageByScroll$ = fromEvent(window, "scroll").pipe(
    map(() => window.scrollY),
    tap(v => console.log(v)),
    filter(current =>
      current >= document.body.clientHeight - window.innerHeight),
    debounceTime(1000),
    distinct(),
    map(y => Math.ceil(
      (y + window.innerHeight)/(this.itemHeight * this.numberOfItems)
      )
    )
  );

  private pageByResize$ = fromEvent(window, "resize").pipe(
    debounceTime(1000),
    map(_ => Math.ceil(
      (window.innerHeight + document.body.scrollTop) /
      (this.itemHeight * this.numberOfItems)
    ))
  );

  private pageToLoad$ = merge(
    this.pageByManual$,
    this.pageByResize$,
    this.pageByScroll$
  ).pipe(
    distinct(),
    filter(page => this.cache[page-1] === undefined)
  );

  loading = false;

  terminals$ = this.pageToLoad$.pipe(
    tap(_ => this.loading = true),
    flatMap((page: number) => {

      return this.httpClient.get(`https://map1.mobo.cards:8093/api/v1/terminals?page=${page}&size=10&sort=asc&sort=terminalId`)
        .pipe(
          // map((resp: any) => { console.log(resp); return resp.results; }),
          map((resp: any) => { console.log(resp.content); return resp.content; }),
          tap(resp => {
            this.cache[page - 1] = resp;
            if((this.itemHeight * this.numberOfItems * page) < window.innerHeight) {
              this.pageByManual$.next(page + 1);
            }
          })
      )
    }),
    map(() => _.flatMap(this.cache))
  );
  constructor(private httpClient: HttpClient) {}

}
