import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings;
  editForm: FormGroup;
  takeChoices: any;
  allowedLanguages: any;
  dtPinInputDatePickerOptions: any;
  myDatePickerOptions: any;
  dtPinInput;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.dtPinInputDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false,
      componentDisabled: true
    };

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
      changeDevice: [''],
      currency: [''],
      dtPinInput: [''],
      hostId: [''],
      language: [''],
      limitMcStandard: [''],
      limitVisaStandard: [''],
      maxReceiptNumber: [''],
      pendingNumber: [''],
      pendingTime: [''],
      receiptNumber: [''],
      timeZReport: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.getGeneralConfiguration()
      .subscribe( data => {
          console.log(data)
          this.dtPinInput = { jsdate: new Date(data.dtPinInput) };
          this.settings = data;
          this.editForm.setValue(this.settings);
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
