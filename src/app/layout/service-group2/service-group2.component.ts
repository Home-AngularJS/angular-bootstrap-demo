import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import {allowedIpsCardGroupsToDto, dtoToServiceGroup, serviceGroupToUpdate } from '../../core/model/service-group.model';
import { dtoToReceiptSendChannel, multiselectToEntity, receiptSendChannelToDto } from '../../core/model/receipt-send-channel.model';

@Component({
  selector: 'app-service-group2',
  templateUrl: './service-group2.component.html',
  styleUrls: ['./service-group2.component.css']
})
export class ServiceGroup2Component implements OnInit {
  serviceGroups: any = [];
  selectedServiceGroup;
  selectedServiceGroupNumber;
  allAllowedLanguages = [];
  allProductIds: any = [];
  allIpsNames: any = [];
  allReceiptSendChannels = [];
  allReceiptSendChannelsDto = [];
  allAllowedIpsCardGroups: any = [];
  receiptSendChannelsSettings = {};
  basicReceiptSendChannels;
  isButtonSave: Boolean = false;
  allowedLanguagesSettings = {};
  productIdsSettings = {};
  ipsNamesSettings = {};
  takeChoices: any;
  idMpsCards;
  products;
  receiptTemplates;
  productNames: any = [];
  productNamesSettings = {};
  editForm: FormGroup;
  @ViewChild('servicegroup') servicegroup: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalServiceGroup: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();
    this.allAllowedLanguages = this.dataService.getAllAllowedLanguages();

    this.receiptSendChannelsSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.allowedLanguagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.productIdsSettings = {
      itemsShowLimit: 3,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.productNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.ipsNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      disabled: true
    };
    this.editForm = this.formBuilder.group({
      groupNumber: [''],
      groupName: ['', Validators.required],
      opPurchase: [''],
      opReversal: [''],
      opRefund: [''],
      opQr: [''],
      opNfc: [''],
      opManual: [''],
      opPin: [''],
      geoPosition: [''],
      receiptTemplate: [''],
      receiptTemplateId: [''],
      allowedLanguages: [''],
      allowedLanguageIds: [''],
      receiptSendChannels: [''],
      productNames: [''],
      productIds: [''],
      ipsNames: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
      totalAmountLimit: [''],
      totalCountLimit: [''],
      totalLimitPeriod: ['']
    });

    /**
     * PROD. Profile
     */

    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          this.receiptTemplates = data.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const serviceGroups: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const serviceGroup = dtoToServiceGroup(data.content[i]);
            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            serviceGroup.productNames = productNames;
            serviceGroups.push(serviceGroup);
          }
          this.serviceGroups = serviceGroups;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

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

    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          const allAllowedIpsCardGroups: any = data.content;
          this.allAllowedIpsCardGroups = allAllowedIpsCardGroups;
          const allIpsNames: any = [];
          for (let i = 0; i < allAllowedIpsCardGroups.length; i++) {
            allIpsNames.push(allAllowedIpsCardGroups[i].ipsName);
          }
          this.allIpsNames = allIpsNames;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllProducts()
      .subscribe( data => {
          console.log(data)
          const products: any = data.content
          this.products = products;
          const allProductIds: any = [];
          for (let i = 0; i < products.length; i++) allProductIds.push(products[i].productId);
          this.allProductIds = allProductIds;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    this.idMpsCards = this.dataService.findAllIpsCardGroups();
    this.productNames = this.dataService.getAllProductNames();
    this.basicReceiptSendChannels = this.dataService.getBasicReceiptSendChannels();
  }

  public selectServiceGroup(serviceGroup) {
    console.log(serviceGroup);
    this.selectedServiceGroup = serviceGroup;
    if (serviceGroup != null) {
      this.editForm.setValue(serviceGroup);
      this.openServiceGroup();
    }
  }

  public selectServiceGroupNumber(serviceGroup) {
    if (this.selectedServiceGroupNumber === serviceGroup.groupNumber) {
      this.selectServiceGroup(serviceGroup);
    } else {
      this.selectedServiceGroupNumber = serviceGroup.groupNumber;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  public onSelectReceiptSendChannels(item: any) {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onDeSelectReceiptSendChannels(item: any) {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onDropDownCloseReceiptSendChannels() {
    const entity = this.editForm.value;
    multiselectToEntity(entity.receiptSendChannels)
    this.setButtonSaveByEntity(entity);
  }

  public onSelectAllReceiptSendChannels(items: any) {
    this.setButtonSaveByItems(items);
  }

  public onDeSelectAllReceiptSendChannels(items: any) {
    this.setButtonSaveByItems(items);
  }

  private setButtonSaveByEntity(entity) {
    this.isButtonSave = false;
    if (entity.receiptSendChannels.length === 0) {
      // this.resetReceiptSendChannels();
    } else {
      if (entity.receiptSendChannels.length > 0) {
        for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
          if (entity.receiptSendChannels.indexOf(this.basicReceiptSendChannels[b]) > -1) {
            this.isButtonSave = true;
          }
        }
      }
    }
  }

  private setButtonSaveByItems(items) {
    this.isButtonSave = false;
    if (items.length === 0) {
      // this.resetReceiptSendChannels();
    } else {
      if (items.length > 0) {
        for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
          if (items.indexOf(this.basicReceiptSendChannels[b]) > -1) {
            this.isButtonSave = true;
          }
        }
      }
    }
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

  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  public openServiceGroup: EmitType<object> = () => {
    document.getElementById('servicegroup').style.display = 'block';
    this.isModalServiceGroup = true;
    this.servicegroup.show();
  }

  public onServiceGroup: EmitType<object> = () => {
    // save or update:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.editForm.value;
      console.log(entity)
      const update = serviceGroupToUpdate(this.editForm.value);
      update.receiptSendChannelIdList = receiptSendChannelToDto(this.allReceiptSendChannelsDto, entity.receiptSendChannels)
      update.ipsCardGroupIdList = allowedIpsCardGroupsToDto(this.allAllowedIpsCardGroups, entity.ipsNames)

      if (update.groupNumber === null) {
        this.apiService.createServiceGroup(update)
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Создать', 'Группу терминала');
              this.pageRefresh(); // created successfully.
            },
            error => {
              this.showError('Создать', 'Группу терминала');
            });
      } else {
        this.apiService.updateServiceGroup(update)
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Сохранить', 'Группу терминала ' + update.groupNumber);
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Сохранить', 'Группу терминала ' + update.groupNumber);
            });
      }
    };

    // cancel:
    document.getElementById('btnCancel').onclick = (): void => {
      this.servicegroup.hide();
    };
  }

  public offServiceGroup: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public pageRefresh() {
    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const serviceGroups: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const serviceGroup = dtoToServiceGroup(data.content[i]);
            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            serviceGroup.productNames = productNames;
            serviceGroups.push(serviceGroup);
          }
          this.serviceGroups = serviceGroups;
          this.showSuccess('Обновить', 'Группы Терминалов');
        },
        error => {
          this.showError('Обновить', 'Группы Терминалов');
        });
  }
}
