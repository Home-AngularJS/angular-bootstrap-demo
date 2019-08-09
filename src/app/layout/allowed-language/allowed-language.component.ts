import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import {Router} from '@angular/router';
import {ApiService} from '../../core/service/api.service';

@Component({
  selector: 'app-allowed-language',
  templateUrl: './allowed-language.component.html',
  styleUrls: ['./allowed-language.component.css']
})
export class AllowedLanguageComponent implements OnInit {

  allowedLanguages;

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */


    /**
     * DEV. Profile
     */
    this.allowedLanguages = this.dataService.getAllowedLanguages();
  }
}
