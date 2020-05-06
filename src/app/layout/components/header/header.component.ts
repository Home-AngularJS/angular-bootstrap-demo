import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
// import { User } from '../../../core/model/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../../core/service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string;
  languages: { id: string, title: string }[] = [];
  // user: User;
  username

  constructor(private router: Router, @Inject(TranslateService) private translateService: TranslateService, private apiService: ApiService, public dataService: DataService) {
    // initialize translate service
    const browserLang = this.translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|ru|uk/) ? browserLang : environment.defaultLocale);
    this.selectedLanguage = browserLang.match(/en|ru|uk/) ? browserLang : environment.defaultLocale;
  }

  ngOnInit() {
    this.username = window.localStorage.getItem('username')
    this.setLocale();

    /**
     * DEV. Profile
     */
  }

  // editUser(user: User): void {
  //   console.log(user)
  //   window.localStorage.removeItem("editUserId");
  //   window.localStorage.setItem("editUserId", user.id.toString());
  //   this.router.navigate(['edit-user']);
  // }

  public changeLocale(language) {
    this.translateService.use(language.id);
    this.setLocale();
  }

  public get currentLanguage(): string {
    return this.translateService.currentLang;
  }

  private setLocale() {
    this.translateService.get(environment.locales.map(lang => `LANGUAGES.${lang.toUpperCase()}`))
      .subscribe(translations => {
        this.languages = environment.locales.map(lang => {
          return { id: lang, title: translations[`LANGUAGES.${lang.toUpperCase()}`] };
        });
      });
  }
}
