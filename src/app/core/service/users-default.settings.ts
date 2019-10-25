import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class UsersDefaultSettings {
  search = {};

  slice = { page: 1, size: 10 };

  filter = {
    id: [{ operator: 'lt', type: 'number', value: '' }] // name: [{ operator: 'lt', type: 'string', value: 'A' }] // balance: [{ operator: 'lt', type: 'number', value: 2000 }]
  };

  sort = {
    pointer: 'id', // pointer: 'name.first', // pointer: 'balance',
    direction: 'asc'
  };
}
