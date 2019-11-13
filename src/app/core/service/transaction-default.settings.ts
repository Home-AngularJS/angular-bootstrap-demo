import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransactionDefaultSettings {
  search = {};

  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'transactionDate', value: '' }]
  };

  sort = {
    pointer: 'transactionDate',
    direction: 'desc'
  };
}
