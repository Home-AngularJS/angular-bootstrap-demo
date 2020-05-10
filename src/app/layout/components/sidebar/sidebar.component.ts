import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../core/service/data.service';
import { UserGrantPermission } from '../../../core/model/user-role.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private permission: UserGrantPermission, public dataService: DataService) { }

  ngOnInit() { }
}
