import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
// import { User } from '../../../core/model/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../../core/service/data.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';
import { UserGrant, UserGrantPermission } from '../../../core/model/user-role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  languages: { id: string, title: string }[] = [];
  // user: User;
  username

  constructor(private router: Router, @Inject(TranslateService) private translateService: TranslateService, private permission: UserGrantPermission, public dataService: DataService) { }

  ngOnInit() {
    this.username = window.localStorage.getItem('username')
    this.setLanguages();

    /**
     * DEV. Profile
     */
  }

  isIpsCardGroupView() {
    return this.permission.isPermission(UserGrant.PAYMENT_SYSTEMS_VIEW);
  }

  isTmsKeyView() {
    return this.permission.isPermission(UserGrant.SYSTEM_KEYS_VIEW);
  }

  isIpsKeyView() {
    return this.permission.isPermission(UserGrant.PAYMENT_SYSTEM_KEYS_VIEW);
  }

  isGeneralConfigurationView() {
    return this.permission.isPermission(UserGrant.GENERAL_SETTINGS_VIEW);
  }

  isAttestationView() {
    return this.permission.isPermission(UserGrant.ATTESTATION_PARAMETERS_VIEW);
  }

  isBankView() {
    return this.permission.isPermission(UserGrant.BANK_VIEW);
  }

  isUserRoleView() {
    return this.permission.isPermission(UserGrant.ROLE_VIEW);
  }

  // editUser(user: User): void {
  //   console.log(user)
  //   window.localStorage.removeItem("editUserId");
  //   window.localStorage.setItem("editUserId", user.id.toString());
  //   this.router.navigate(['edit-user']);
  // }

  public changeLanguage(language) {
    this.translateService.use(language.id);
    this.setLanguages();
  }

  private setLanguages() {
    this.translateService.get(environment.locales.map(language => this.dataService.translate('languages.' + language)))
      .subscribe(translations => {
        this.languages = environment.locales.map(language => {
          return { id: language, title: translations[this.dataService.translate('languages.' + language)] };
        });
      });
  }
}
