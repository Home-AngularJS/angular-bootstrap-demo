import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    // this.dropdownList = [
    //   'Mumbai',
    //   'Bangaluru',
    //   'Pune',
    //   'Navsari',
    //   'New Delhi'
    // ];
    // this.selectedItems = [
    //   'Bangaluru',
    //   'Pune'
    // ];
    // this.dropdownSettings = {
    //   itemsShowLimit: 2,
    //   noDataAvailablePlaceholderText: 'нет данных'
    // };
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }
}
