import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import {Router} from '@angular/router';
import {ApiService} from '../../core/service/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions;
  terminalGroups;

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */
    this.apiService.findAllTransactions()
      .subscribe( data => {
          console.log(data)
          const transactions: any = data
          this.transactions = transactions.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const terminalGroups: any = data
          this.terminalGroups = terminalGroups.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.transactions = this.dataService.findAllTransactions();
    // this.terminalGroups = this.dataService.findAllServiceGroups();
  }

  public pageRefresh() {
    location.reload();
  }

}
