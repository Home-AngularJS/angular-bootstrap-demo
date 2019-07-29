import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal-groups',
  templateUrl: './terminal-groups.component.html',
  styleUrls: ['./terminal-groups.component.css']
})
export class TerminalGroupsComponent implements OnInit {

  terminal : {id, name, description, email} = {id: null, name: "", description: "", email: ""};

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }

  createTerminal(){
    console.log(this.terminal);
    this.dataService.createTerminal(this.terminal);
    this.terminal = {id: null, name: "", description: "", email: ""};

  }
}
