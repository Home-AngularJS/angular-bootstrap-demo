import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { DataService } from './core/service/data.service';

/**
 * https://samvloeberghs.be/posts/scroll-to-top-on-angular-router-navigation
 * https://dev.to/angular/scroll-to-top-on-angular-router-navigation-1iha
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = { 'isLoggedIn': false };
  year = 2019;
  version = '1.3.0';

  constructor(private router: Router, @Inject(TranslateService) private translateService: TranslateService, public dataService: DataService) {
    // initialize translate service
    const browserLang = this.translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|ru|uk/) ? browserLang : environment.defaultLocale);
  }

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
