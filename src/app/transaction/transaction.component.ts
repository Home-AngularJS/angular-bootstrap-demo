import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  terminalGroups;
  transactions;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.terminalGroups = this.dataService.getTerminalGroups();
    this.transactions = this.dataService.getTransactions();
  }
}
