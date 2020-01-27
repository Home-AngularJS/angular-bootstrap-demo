import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationDefaultSettings {
  search = {};

  slice = { page: 1, size: 18 };

  filter = {
    date: [{ operator: 'lt', type: 'registrationDate', value: '' }]
  };

  sort = {
    pointer: 'registrationDate',
    direction: 'desc'
  };
}
