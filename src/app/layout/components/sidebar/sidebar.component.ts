import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() { }

}
