import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  banks;

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */


    /**
     * DEV. Profile
     */
    this.banks = this.dataService.getBanks();
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
}
