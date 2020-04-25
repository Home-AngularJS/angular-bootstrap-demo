import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { TerminalMessageService } from '../../../core/service/terminal-message.service';
import { TerminalMessageDefaultSettings } from '../../../core/service/terminal-message-default.settings';
import {ApiService} from '../../../core/service/api.service';
import { DataService } from '../../../core/service/data.service';

const providers = [{
  provide: SmartTable,
  useFactory: (service: TerminalMessageService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [TerminalMessageService, TerminalMessageDefaultSettings]
}];

@Component({
  selector: 'app-terminal-message',
  templateUrl: './terminal-message.component.html',
  styleUrls: ['./terminal-message.component.css'],
  providers
})
export class TerminalMessageComponent implements OnInit {
  takeTerminalStatuses: any;
  title;
  message: string = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, public dataService: DataService, private service: TerminalMessageService) { }

  ngOnInit() {
    this.takeTerminalStatuses = this.dataService.getTakeTerminalStatuses();

    /**
     * PROD. Profile
     */
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://stackoverflow.com/questions/49194316/override-a-components-default-sass-variables-in-a-different-angular-cli-project
   * https://github.com/scttcper/ngx-toastr
   */
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 20000
    });
  }

  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

  public selectPage(select: any) {
    console.log(select)
    return parseInt(select);
  }

  public selectLastPage(length: any, size: any) {
    const _length = parseInt(length);
    const _size = parseInt(size);
    const max = _length / _size;
    const _lastPage = Math.round(max);
    return (_lastPage < max) ? _lastPage + 1 : _lastPage;
  }
}
