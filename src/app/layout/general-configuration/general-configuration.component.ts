import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToGeneralConfiguration } from '../../core/model/general-configuration.model';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.css']
})
export class GeneralConfigurationComponent implements OnInit {

  editForm: FormGroup;
  takeChoices: any;
  allowedLanguages: any;
  allLanguages = [];
  languagesSettings = {};
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
      // appActiveTimeHour: [''],
      // appActiveTimeMinute: [''],
      currency: [''],
      hostId: [''],
      language: [''],
      noPinLimitMcStandard: [''],
      noPinLimitVisaStandard: [''],
      minReceiptNumber: [''],
      maxReceiptNumber: [''],
      pendingNumber: [''],
      pendingTime: [''],
      timeZReport: [''],
      phoneMask: [''],
      receiptHost: [''],
      beginCardMask: [''],
      endCardMask: [''],
      cardMaskSymbol: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.getGeneralConfiguration()
      .subscribe( data => {
          const entity: any = dtoToGeneralConfiguration(data);
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
    this.allLanguages = this.dataService.getAllAllowedLanguages();

    this.languagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      singleSelection: true
    };
  }

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
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
