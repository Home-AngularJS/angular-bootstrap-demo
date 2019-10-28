import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttestationHistoryDefaultSettings {
  search = {};

  slice = { page: 1, size: 19 };

  filter = {
    date: [{ operator: 'lt', type: 'date', value: '' }]
  };

  sort = {
    pointer: 'date',
    direction: 'desc'
  };
}
