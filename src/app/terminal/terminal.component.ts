import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  terminals ;
  selectedTerminal;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.terminals = this.dataService.getTerminals();
  }
  public selectTerminal(terminal){
    this.selectedTerminal = terminal;
  }

}
