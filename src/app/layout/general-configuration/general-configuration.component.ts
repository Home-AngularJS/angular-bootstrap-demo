import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToGeneralConfiguration, generalConfigurationToDto } from '../../core/model/general-configuration.model';
import { dtoToReceiptSendChannel } from '../../core/model/receipt-send-channel.model';
import { UserGrant, UserGrantPermission } from '../../core/model/user-role.model';

@Component({
  selector: 'app-general-configuration',
  templateUrl: './general-configuration.component.html',
  styleUrls: ['./general-configuration.component.css']
})
export class GeneralConfigurationComponent implements OnInit {

  editForm: FormGroup;
  takeChoices: any;
  // allowedLanguages: any;
  // allLanguages = [];
  // languagesSettings = {};
  basicReceiptSendChannels;
  allReceiptSendChannels = [];
  allReceiptSendChannelsDto = [];
  receiptSendChannelsSettings = {};
  myDatePickerOptions: any;
  appActiveTime;
  pendingTime;
  timeZReport;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, private permission: UserGrantPermission, public dataService: DataService) { }

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
    // this.allowedLanguages = this.dataService.getAllowedLanguages();
    this.basicReceiptSendChannels = this.dataService.getBasicReceiptSendChannels();

    this.editForm = this.formBuilder.group({
      appActiveTime: [''],
      // currency: [''],
      hostId: [''],
      // language: [''],
      attestationTimeMin: [''],
      attestationTimeMax: [''],
      minReceiptNumber: [''],
      maxReceiptNumber: [''],
      pendingNumber: [''],
      pendingTime: [''],
      timeZReport: [''],
      phoneMask: [''],
      receiptHost: [''],
      beginCardMask: [''],
      endCardMask: [''],
      cardMaskSymbol: [''],
      basicReceiptSendChannels: [''],
      amountTimeout: [''],
      manualTimeout: [''],
      nfcTimeout: [''],
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllReceiptSendChannels()
      .subscribe( data => {
          console.log(data)
          const allReceiptSendChannels = data.content;
          this.allReceiptSendChannelsDto = allReceiptSendChannels;
          this.allReceiptSendChannels = dtoToReceiptSendChannel(allReceiptSendChannels);
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.getGeneralConfiguration()
      .subscribe( data => {
          const entity: any = dtoToGeneralConfiguration(data);
          console.log(entity)

          // entity.basicReceiptSendChannels = this.basicReceiptSendChannels;
          const labelBasic = ' (базовый)';
          const basicReceiptSendChannels: any = [];
          for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
            basicReceiptSendChannels.push(this.basicReceiptSendChannels[b] + labelBasic);
          }
          entity.basicReceiptSendChannels = basicReceiptSendChannels;

          this.appActiveTime = entity.appActiveTime;
          this.pendingTime = entity.pendingTime;
          this.timeZReport = entity.timeZReport;
          this.editForm.setValue(entity);
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.allLanguages = this.dataService.getAllAllowedLanguages();

    // this.languagesSettings = {
    //   itemsShowLimit: 1,
    //   noDataAvailablePlaceholderText: 'нет данных',
    //   singleSelection: true
    // };

    this.receiptSendChannelsSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      singleSelection: false
    };
  }

  isGeneralConfigurationCreate() {
    return this.permission.isPermission(UserGrant.GENERAL_SETTINGS_CREATE);
  }

  isGeneralConfigurationSave() {
    return this.permission.isPermission(UserGrant.GENERAL_SETTINGS_UPDATE);
  }

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
  }

  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread
   */
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 20000
    });
  }

  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

  onSubmit() {
    const entity = generalConfigurationToDto(this.allReceiptSendChannelsDto, this.editForm.value);
    console.log(entity)
    this.apiService.updateGeneralConfiguration(entity)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess('Сохранить', 'Установки');
          this.pageRefresh(); // updated successfully.
        },
        error => {
          // alert( JSON.stringify(error) );
          this.showError('Сохранить', 'Установки');
        });
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.getGeneralConfiguration()
      .subscribe( data => {
          const entity: any = dtoToGeneralConfiguration(data);
          console.log(entity)

          const labelBasic = ' (базовый)';
          const basicReceiptSendChannels: any = [];
          for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
            basicReceiptSendChannels.push(this.basicReceiptSendChannels[b] + labelBasic);
          }
          entity.basicReceiptSendChannels = basicReceiptSendChannels;

          this.appActiveTime = entity.appActiveTime;
          this.pendingTime = entity.pendingTime;
          this.timeZReport = entity.timeZReport;
          this.editForm.setValue(entity);

          this.showSuccess('Обновить', 'Установки');
        },
        error => {
          // alert( JSON.stringify(error) );
          this.showError('Обновить', 'Установки');
        });
  }
}
