import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageTemplateDefaultSettings {
  search = {};

  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'id', value: '' }]
  };

  sort = {
    pointer: 'id',
    direction: 'asc'
  };
}
