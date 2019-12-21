import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalDefaultSettings {
  search = {};

  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'dateTimeInit', value: '' }]
  };

  sort = {
    pointer: 'dateTimeInit',
    direction: 'desc'
  };
}
