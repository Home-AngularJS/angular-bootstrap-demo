import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../core/service/api.service';
import { first } from 'rxjs/operators';
import { dtoToServiceGroup, serviceGroupNew, serviceGroupToDto } from '../../core/model/service-group.model';

@Component({
  selector: 'app-service-group',
  templateUrl: './service-group.component.html',
  styleUrls: ['./service-group.component.css']
})
export class ServiceGroupComponent implements OnInit {

  serviceGroups;
  selectedServiceGroup;
  selectedServiceGroupNumber;
  allAllowedLanguages = [];
  allowedLanguagesSettings = {};
  editForm: FormGroup;
  takeChoices: any;
  idMpsCards;
  products;
  productNames: any = [];
  productNamesSettings = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private apiService: ApiService, public dataService: DataService) { }

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
          const terminalGroups: any = data
          this.serviceGroups = terminalGroups.content;
          for (let i = 0; i < this.serviceGroups.length; i++) {

            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            this.serviceGroups[i].productNames = productNames;
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.serviceGroups = this.dataService.findAllServiceGroups();
    this.idMpsCards = this.dataService.findAllIpsCardGroups();
    this.products = this.dataService.findAllProducts();
    this.productNames = this.dataService.getAllProductNames();
  }

  public createServiceGroup() {
    const entity: any = serviceGroupNew();
    console.log(entity)
    this.selectedServiceGroup = entity;
    this.editForm.setValue(entity);
  }

  public selectServiceGroup(terminalGroup) {
    console.log(terminalGroup);
    this.selectedServiceGroup = terminalGroup;
    const entity: any = dtoToServiceGroup(terminalGroup);
    this.editForm.setValue(entity);
  }

  public selectServiceGroupNumber(terminalGroup) {
    if (this.selectedServiceGroupNumber === terminalGroup.groupNumber) {
      this.selectServiceGroup(terminalGroup);
    } else {
      this.selectedServiceGroupNumber = terminalGroup.groupNumber;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  public onSubmit() {
    const dto = serviceGroupToDto(this.editForm.value);
    if (dto.groupNumber === null) {
      this.apiService.createServiceGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateServiceGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
      }
    }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public pageRefresh() {
    location.reload();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
