import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreRegistrationDefaultSettings {
  search = {};
  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'merchantId', value: '' }]
  };

  sort = {
    pointer: 'merchantId',
    direction: 'asc'
  };
}
