import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TerminalMessageDefaultSettings {
  search = {};

  slice = { page: 1, size: 12 };

  filter = {
    date: [{ operator: 'lt', type: 'terminalId', value: '' }]
  };

  sort = {
    pointer: 'terminalId',
    direction: 'desc'
  };
}
