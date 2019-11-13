import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReceiptSendAuditDefaultSettings {
  search = {};

  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'sendDate', value: '' }]
  };

  sort = {
    pointer: 'sendDate',
    direction: 'desc'
  };
}
