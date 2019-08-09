import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../../core/model/user.model";
import {ApiService} from "../../../core/service/api.service";
import {DataService} from '../../../core/service/data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  cities: any;

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.cities = this.dataService.getCities();

    this.apiService.getUsers()
      .subscribe( data => {
        // this.users = data.result;
        console.log(data)
        const anyData: any = data
        const users = anyData
        this.users = users;
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  editUser(user: User): void {
    console.log(user)
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
}
