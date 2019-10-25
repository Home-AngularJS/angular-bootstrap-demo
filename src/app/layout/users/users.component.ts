import { Component } from '@angular/core';
import { SmartTable, of, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { UsersDefaultSettings } from '../../core/service/users-default.settings';
import { UsersService } from "../../core/service/users.service";

const providers = [{
  provide: SmartTable,
  useFactory: (usersService: UsersService, settings: TableState) => of([], settings, server({
    query: (tableState) => usersService.queryUsers(tableState)
  })),
  deps: [UsersService, UsersDefaultSettings]
}];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers
})
export class UsersComponent {

}
