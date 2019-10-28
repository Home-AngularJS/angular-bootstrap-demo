import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttestationHistoryDefaultSettings {
  search = {};

  slice = { page: 1, size: 19 };

  filter = {
    id: [{ operator: 'lt', type: 'number', value: '' }]
  };

  sort = {
    pointer: 'id',
    direction: 'asc'
  };
}
