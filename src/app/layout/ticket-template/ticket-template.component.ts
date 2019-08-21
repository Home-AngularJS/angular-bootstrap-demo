import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-template',
  templateUrl: './ticket-template.component.html',
  styleUrls: ['./ticket-template.component.css']
})
export class TicketTemplateComponent implements OnInit {

  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  date1 = new Date();
  date2 = new Date();
  date3 = new Date();
  mytime1: Date = new Date();
  mytime2: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();

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
