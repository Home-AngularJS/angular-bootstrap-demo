import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal-groups',
  templateUrl: './terminal-groups.component.html',
  styleUrls: ['./terminal-groups.component.css']
})
export class TerminalGroupsComponent implements OnInit {

  contact : {id, name, description, email} = {id: null, name: "", description: "", email: ""};

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  createContact(){
    console.log(this.contact);
    this.dataService.createContact(this.contact);
    this.contact = {id: null, name: "", description: "", email: ""};

  }
}
