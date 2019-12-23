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
import { bankToDto, dtoToBank } from '../../core/model/bank.model';
import {dtoToServiceGroup} from '../../core/model/service-group.model';

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
  allowedLanguagesSettings = {};
  takeChoices: any;
  idMpsCards;
  products;
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

    this.allowedLanguagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных'
    };

    this.productNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных'
    };

    this.editForm = this.formBuilder.group({
      groupNumber: [''],
      groupName: ['', Validators.required],
      opPurchase: [''],
      opReversal: [''],
      opRefund: [''],
      manual: [''],
      pin: [''],
      geoPosition: [''],
      receiptTemplate: [''],
      allowedLanguages: [''],
      allowedLanguageIds: [''],
      productNames: [''],
      visaAccepted: [''],
      mcAccepted: [''],
      prostirAccepted: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          // const serviceGroups: any = data
          // this.serviceGroups = serviceGroups.content;
          // for (let i = 0; i < this.serviceGroups.length; i++) {
          //
          //   const randomProduct = this.getRandomInt(0, this.products.length-1);
          //   const product = this.products[randomProduct];
          //   const productNames: any = [];
          //   productNames.push(product.productName);
          //   this.serviceGroups[i].productNames = productNames;
          // }

          const serviceGroups: any = [];
          for (let i = 0; i < data.content.length; i++) {
            // const serviceGroup = data.content[i];
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

    /**
     * DEV. Profile
     */
    this.idMpsCards = this.dataService.findAllIpsCardGroups();
    this.products = this.dataService.findAllProducts();
    this.productNames = this.dataService.getAllProductNames();
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

      if (entity.id === null) {
        const entityUpdate: any = bankToDto(entity)
        this.apiService.createBank(entityUpdate)
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Создать', 'Группу Терминалов');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Создать', 'Группу Терминалов');
            });
      } else {
        this.apiService.updateBank(entity.id, bankToDto(entity))
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Сохранить', 'Группу Терминалов');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Сохранить', 'Группу Терминалов');
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
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          this.serviceGroups = [];
          for (let i = 0; i < data.content.length; i++) this.serviceGroups.push(dtoToBank(data.content[i]));
          this.showSuccess('Обновить', 'Группы Терминалов');
        },
        error => {
          this.showError('Обновить', 'Группы Терминалов');
        });
  }
}
