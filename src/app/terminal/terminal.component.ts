import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  terminals;
  selectedTerminal;
  terminalGroups;

  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.terminals = this.dataService.getTerminals();
  }

  public selectTerminal(terminal){
    this.selectedTerminal = terminal;
  }

  public selectTerminalGroup(){
    // for (let i = 0; i < this.terminalGroups.length; i++) {
    //   if (this.terminalGroups[i].groupNumber==groupNumber) this.selectedTerminalGroup = this.terminalGroups[i];
    // }
    this.terminalGroups = this.dataService.getTerminalGroups();
  }
}
