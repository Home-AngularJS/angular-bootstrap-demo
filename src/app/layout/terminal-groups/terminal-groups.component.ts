import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ApiService } from '../../core/service/api.service';
import { first } from 'rxjs/operators';
import { dtoToTerminalGroups, terminalGroupsNew, terminalGroupsToDto } from '../../core/model/terminal-groups.model';

@Component({
  selector: 'app-terminal-groups',
  templateUrl: './terminal-groups.component.html',
  styleUrls: ['./terminal-groups.component.css']
})
export class TerminalGroupsComponent implements OnInit {

  terminalGroups;
  selectedTerminalGroup;
  selectedTerminalGroupNumber;
  allAllowedLanguages = [];
  allowedLanguagesSettings = {};
  editForm: FormGroup;
  takeChoices: any;
  idMpsCards;
  products;
  productNames: any = [];
  productNamesSettings = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

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
          this.terminalGroups = terminalGroups.content;
          for (let i = 0; i < this.terminalGroups.length; i++) {

            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            this.terminalGroups[i].productNames = productNames;
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.terminalGroups = this.dataService.findAllServiceGroups();
    this.idMpsCards = this.dataService.findAllMpsCards();
    this.products = this.dataService.findAllProducts();
    this.productNames = this.dataService.getAllProductNames();
  }

  public createTerminalGroup() {
    const entity: any = terminalGroupsNew();
    console.log(entity)
    this.selectedTerminalGroup = entity;
    this.editForm.setValue(entity);
  }

  public selectTerminalGroup(terminalGroup) {
    console.log(terminalGroup);
    this.selectedTerminalGroup = terminalGroup;
    const entity: any = dtoToTerminalGroups(terminalGroup);
    this.editForm.setValue(entity);
  }

  public selectTerminalGroupNumber(terminalGroup) {
    if (this.selectedTerminalGroupNumber === terminalGroup.groupNumber) {
      this.selectTerminalGroup(terminalGroup);
    } else {
      this.selectedTerminalGroupNumber = terminalGroup.groupNumber;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  public onSubmit() {
    const dto = terminalGroupsToDto(this.editForm.value);
    if (dto.groupNumber === null) {
      this.apiService.createServiceGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateServiceGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
      }
    }

  public pageRefresh() {
    location.reload();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
