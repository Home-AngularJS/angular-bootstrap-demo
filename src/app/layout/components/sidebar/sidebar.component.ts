import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  selectedLanguage: string;
  languages: { id: string, title: string }[] = [];

  constructor(@Inject(TranslateService) private translateService: TranslateService) {
    // initialize translate service
    const browserLang = this.translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|ru|uk/) ? browserLang : environment.defaultLocale);
    this.selectedLanguage = browserLang.match(/en|ru|uk/) ? browserLang : environment.defaultLocale;
  }

  ngOnInit() {
    this.setLocale();
  }

  public getTranslate(item) {
    return (item).toUpperCase();
  }

  private setLocale() {
    this.translateService.get(environment.locales.map(lang => this.getTranslate('languages.' + lang)))
      .subscribe(translations => {
        this.languages = environment.locales.map(lang => {
          return { id: lang, title: translations[this.getTranslate('languages.' + lang)] };
        });
      });
  }
}
