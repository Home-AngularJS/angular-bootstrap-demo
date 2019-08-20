import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToSettings } from '../../core/model/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  editForm: FormGroup;
  takeChoices: any;
  allowedLanguages: any;
  myDatePickerOptions: any;
  appActiveTime;
  pendingTime;
  timeZReport;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.myDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false,
      componentDisabled: true
    };

    this.takeChoices = this.dataService.getTakeChoices();

    this.allowedLanguages = this.dataService.getAllowedLanguages();

    this.editForm = this.formBuilder.group({
      appActiveTime: [''],
      currency: [''],
      hostId: [''],
      language: [''],
      limitMcStandard: [''],
      limitVisaStandard: [''],
      minReceiptNumber: [''],
      maxReceiptNumber: [''],
      pendingNumber: [''],
      pendingTime: [''],
      timeZReport: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.getGeneralConfiguration()
      .subscribe( data => {
          const entity: any = dtoToSettings(data);
          console.log(entity)
          this.appActiveTime = entity.appActiveTime;
          this.pendingTime = entity.pendingTime;
          this.timeZReport = entity.timeZReport;
          this.editForm.setValue(entity);
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  onSubmit() {
    this.apiService.updateGeneralConfiguration(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.pageRefresh(); // updated successfully.
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  public pageRefresh() {
    location.reload();
  }
}
