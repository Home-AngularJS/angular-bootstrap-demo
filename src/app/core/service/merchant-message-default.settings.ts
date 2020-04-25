import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantMessageDefaultSettings {
  search = {};

  slice = { page: 1, size: 15 };

  filter = {
    date: [{ operator: 'lt', type: 'id', value: '' }]
  };

  sort = {
    pointer: 'id',
    direction: 'asc'
  };
}
