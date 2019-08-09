import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = {'isLoggedIn':false};

  constructor(private router: Router) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
  }

  public getIsLoggedIn(): { isLoggedIn } {
    return this.isLoggedIn;
  }

  public setLoggedIn(isLoggedIn: { isLoggedIn }) {
    this.isLoggedIn = isLoggedIn.isLoggedIn;
  }
}
