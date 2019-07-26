import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  contacts = [
    {id: 1, name: "Terminal 1", description: "Terminal 1 description...", email: "data1-data1-data1"},
    {id: 2, name: "Terminal 2", description: "Terminal 2 description...", email: "data2-data2-data2"},
    {id: 3, name: "Terminal 3", description: "Terminal 3 description...", email: "data3-data3-data3"},
    {id: 4, name: "Terminal 4", description: "Terminal 4 description...", email: "data4-data4-data4"}
  ];

  constructor() { }

  public getContacts():Array<{id, name, description, email}>{
    return this.contacts;
  }
  public createContact(contact: {id, name, description, email}){
    this.contacts.push(contact);
  }
}
