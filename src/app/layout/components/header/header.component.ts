import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/service/api.service';
// import { User } from '../../../core/model/user.model';
import { Router } from '@angular/router';
import { DataService } from '../../../core/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  allowedLanguages = [];
  selectedLanguage;
  selectedLanguageId;
  // user: User;
  username

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

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
    this.username = window.localStorage.getItem('username')

    /**
     * DEV. Profile
     */
    this.allowedLanguages = this.dataService.getAllowedLanguages();
    this.selectedLanguage = this.allowedLanguages[1];
    this.selectedLanguageId = this.selectedLanguage.languageId;
  }

  // editUser(user: User): void {
  //   console.log(user)
  //   window.localStorage.removeItem("editUserId");
  //   window.localStorage.setItem("editUserId", user.id.toString());
  //   this.router.navigate(['edit-user']);
  // }

  public selectLanguage(language) {
    console.log(language);
    this.selectedLanguage = language;
    if (language != null) {
    }
  }

  public selectLanguageId(language) {
    if (this.selectedLanguageId === language.languageId) {
      this.selectLanguage(language);
    } else {
      this.selectedLanguageId = language.languageId;
    }
  }
}
