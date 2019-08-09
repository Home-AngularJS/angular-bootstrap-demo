import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../core/service/api.service';
import {User} from '../../../core/model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    // this.apiService.getUserById(1)
    //   .subscribe( data => {
    //     console.log(data)
    //     const anyData: any = data
    //     const user = anyData
    //     this.user = user;
    //   },
    //     error => {
    //       alert( JSON.stringify(error) );
    //     });
  }

  editUser(user: User): void {
    console.log(user)
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  }
}
