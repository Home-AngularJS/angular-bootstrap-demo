import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  contacts ;
  selectedContact;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.contacts = this.dataService.getContacts();
  }
  public selectContact(contact){
    this.selectedContact = contact;
  }

}
