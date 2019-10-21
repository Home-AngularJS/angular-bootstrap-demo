import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToTerminal, terminalToDto, filterTerminalEmpty, terminalToUpdate } from '../../core/model/terminal.model';
import { dtoToReceiptSendChannel, multiselectToEntity, receiptSendChannelToDto } from '../../core/model/receipt-send-channel.model';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  terminals;
  selectedTerminal;
  selectedTerminalId;
  selectedTerminalZreportTime = [];
  serviceGroups;
  editForm: FormGroup;
  takeChoices: any;
  selectedServiceGroup;
  allAllowedLanguages = [];
  allowedLanguagesSettings = {};
  basicReceiptSendChannels;
  allReceiptSendChannels = [];
  allReceiptSendChannelsDto = [];
  receiptSendChannelsSettings = {};
  products;
  receiptTemplates;
  myDatePickerOptions: any;
  filterDatePickerOptions: any;
  dateTimeInit;
  allProductNames: any = [];
  productNames: any = [];
  allAllowedIpsCardGroups: any = [];
  allowedIpsCardGroups: any = [];
  allIpsNames: any = [];
  receiptTemplateId: any;
  ipsNamesSettings = {};
  productNamesSettings = {};
  isButtonSave: Boolean = false;
  filterForm: FormGroup;
  @ViewChild('filterTerminal') filterTerminal: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };
  @ViewChild('viewTerminalGroup') viewTerminalGroup: DialogComponent;
  isModalView: Boolean = false;
  @ViewChild('viewViewZreportTime') viewViewZreportTime: DialogComponent;
  isModalViewZreportTime: Boolean = false;

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

    this.filterDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false
    };

    this.takeChoices = this.dataService.getTakeChoices();

    this.allAllowedLanguages = this.dataService.getAllAllowedLanguages();

    this.basicReceiptSendChannels = this.dataService.getBasicReceiptSendChannels();

    this.allowedLanguagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.receiptSendChannelsSettings = {
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

    this.productNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.editForm = this.formBuilder.group({
      terminalId: ['', Validators.required],
      groupNumber: ['', Validators.required],
      configChanged: [''],
      dateTimeInit: [''],
      legalName: [''],
      geoPosition: [''],
      manual: [''],
      opPurchase: [''],
      opRefund: [''],
      opReversal: [''],
      pin: [''],
      receiptTemplate: [''],
      receiptTemplateId: [''],
      merchantId: [''],
      merchantName: [''],
      merchantLocation: [''],
      taxId: [''],
      mcc: [''],
      bankName: [''],
      allowedLanguages: [''],
      productNames: [''],
      ipsNames: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
      totalAmountTerminalLimit: [''],
      opQr: [''],
      addData: [''],
      receiptSendChannels: [''],
      deviceName: [''],
      zreportTime: [''],
      zreportEnabled: [''],
      zreportEnabledAll: [''],
      nfc: [''],
      block: [''],
    });

    this.filterForm = this.formBuilder.group({
      terminalId: [''],
      groupNumber: [''],
      dateTimeInit: [''],
      merchantName: [''],
      legalName: [''],
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          const allAllowedIpsCardGroups: any = data.content;
          this.allAllowedIpsCardGroups = allAllowedIpsCardGroups;
          for (let i = 0; i < allAllowedIpsCardGroups.length; i++) {
            this.allIpsNames.push(allAllowedIpsCardGroups[i].ipsName);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllProducts()
      .subscribe( data => {
          console.log(data)
          const products: any = data.content
          this.products = products;
          for (let i = 0; i < products.length; i++) {
            this.allProductNames.push(products[i].productName);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          this.receiptTemplates = data.content;
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllReceiptSendChannels()
      .subscribe( data => {
          console.log(data)
          const allReceiptSendChannels = data.content;
          this.allReceiptSendChannelsDto = allReceiptSendChannels;
          this.allReceiptSendChannels = dtoToReceiptSendChannel(allReceiptSendChannels);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllTerminals()
      .subscribe( data => {
          console.log(data)
          this.terminals = this.terminalToDto(data.content);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const terminalGroups: any = data.content
          this.serviceGroups = terminalGroups;
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
    // this.terminals = this.dataService.findAllTerminals().content;
    // this.devices = this.dataService.getDevices();
    // this.products = this.dataService.findAllProducts();
    // this.productNames = this.dataService.getAllProductNames();
  }

  public selectTerminal(terminal) {
    console.log(terminal);
    this.dateTimeInit = { jsdate: new Date(terminal.dateTimeInit) };
    this.selectedTerminal = Object.assign({}, terminal); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToTerminal(terminal);
    this.editForm.setValue(entity);
  }

  public selectTerminalId(terminal) {
    if (this.selectedTerminalId === terminal.terminalId) {
      this.selectTerminal(terminal);
    } else {
      this.selectedTerminalId = terminal.terminalId;
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

  onSubmit() {
    const entity = this.dtoToTerminal(this.editForm.value);
    const update = terminalToUpdate(entity);
    update.receiptSendChannelIdList = receiptSendChannelToDto(this.allReceiptSendChannelsDto, entity.receiptSendChannels)

    this.apiService.updateTerminal(this.selectedTerminal.terminalId, update)
      .pipe(first())
      .subscribe(
        data => {
          // this.closeTerminal();
          this.pageRefresh(); // updated successfully.
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  public closeTerminal() {
    this.selectedTerminal = null;
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllTerminals()
      .subscribe( data => {
          this.terminals = this.terminalToDto(data.content);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  public onFilterTerminal: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      this.apiService.findTerminals(this.filterForm.value)
        .subscribe( data => {
            this.terminals = this.terminalToDto(data.content);
            this.filterTerminal.hide();
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterTerminalEmpty());
      this.apiService.findTerminals(this.filterForm.value)
        .subscribe( data => {
            this.terminals = this.terminalToDto(data.content);
            this.filterTerminal.hide();
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    };
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

  public offFilterTerminal: EmitType<object> = () => {
  }

  public openFilterTerminal: EmitType<object> = () => {
    document.getElementById('filterTerminal').style.display = 'block';
    this.isModalFilter = true;
    this.filterTerminal.show();
  }

  public onServiceGroupByNumber: EmitType<object> = () => {
  }

  public offServiceGroupByNumber: EmitType<object> = () => {
  }

  public selectServiceGroupByNumber(groupNumber: any) {
    for (let i = 0; i < this.serviceGroups.length; i++) {
      if (this.serviceGroups[i].groupNumber === groupNumber) {
        this.selectedServiceGroup = Object.assign({}, this.serviceGroups[i]); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
      }
    }
    document.getElementById('viewTerminalGroup').style.display = 'block';
    this.isModalView = true;
    this.viewTerminalGroup.show();
  }

  public onZreportTime: EmitType<object> = () => {
  }

  public offZreportTime: EmitType<object> = () => {
    this.selectedTerminalZreportTime = [];
  }

  public selectZreportTime(terminal: any) {
    const entity: any = dtoToTerminal(terminal);
    const terminalZreportTime = entity.zreportTime;
    const terminalZreportEnabled = entity.zreportEnabled;
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.monday) || terminalZreportEnabled.monday==='N') ? 'Пн - нет' : 'Пн - ' + terminalZreportTime.monday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.tuesday) || terminalZreportEnabled.tuesday==='N') ? 'Вт - нет' : 'Вт - ' + terminalZreportTime.tuesday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.wednesday) || terminalZreportEnabled.wednesday==='N') ? 'Ср - нет' : 'Ср - ' + terminalZreportTime.wednesday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.thursday) || terminalZreportEnabled.thursday==='N') ? 'Чт - нет' : 'Чт - ' + terminalZreportTime.thursday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.friday) || terminalZreportEnabled.friday==='N') ? 'Пт - нет' : 'Пт - ' + terminalZreportTime.friday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.saturday) || terminalZreportEnabled.saturday==='N') ? 'Сб - нет' : 'Сб - ' + terminalZreportTime.saturday);
    this.selectedTerminalZreportTime.push((this.isEmpty(terminalZreportTime.sunday) || terminalZreportEnabled.sunday==='N') ? 'Вс - нет' : 'Вс - ' + terminalZreportTime.sunday);

    document.getElementById('viewViewZreportTime').style.display = 'block';
    this.isModalViewZreportTime = true;
    this.viewViewZreportTime.show();
  }

  private isEmpty(val) {
    return (val === null || val === undefined || val === '') ? true : false;
  }

  private terminalToDto(terminals: any) {
    for (let i = 0; i < terminals.length; i++) {
      this.apiService.findDeviceByTerminalId(terminals[i].terminalId)
        .subscribe( data => {
            const device: any = data;
            terminals[i].deviceName = device.deviceName;
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
      terminals[i].ipsNames = this.dtoToAllowedIpsCardGroups(terminals[i].allowedIpsCardGroups);
      terminals[i].productNames = this.dtoToProducts(terminals[i].products);
      terminals[i].receiptTemplateId = terminals[i].receiptTemplate.id;
      terminals[i].zreportEnabledAll = dtoToTerminal(terminals[i]).zreportEnabledAll;
    }
    return terminals;
  }

  private dtoToTerminal(entity: any) {
    multiselectToEntity(entity.allowedLanguages)
    multiselectToEntity(entity.ipsNames)
    multiselectToEntity(entity.productNames)

    const ipsCardGroupIdList: any = [];
    for (let i = 0; i < this.allAllowedIpsCardGroups.length; i++) {
      const ipsCardGroupIdEntity = this.allAllowedIpsCardGroups[i];
      for (let j = 0; j < entity.ipsNames.length; j++) {
        if (ipsCardGroupIdEntity.ipsName === entity.ipsNames[j]) {
          ipsCardGroupIdList.push(ipsCardGroupIdEntity.ipsCardGroupId);
        }
      }
    }
    entity.ipsCardGroupIdList = ipsCardGroupIdList;

    const productIdList: any = [];
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (entity.productNames.indexOf(product.productName) > -1) {
        productIdList.push(product.productId);
      }
    }
    entity.productIdList = productIdList;

    return entity;
  }

  private dtoToAllowedIpsCardGroups(allowedIpsCardGroups: any) {
    const ipsNames: any = [];
    for (let i = 0; i < allowedIpsCardGroups.length; i++) {
      ipsNames.push(allowedIpsCardGroups[i].ipsName);
    }
    return ipsNames;
  }

  private dtoToProducts(products: any) {
    const productNames: any = [];
    for (let i = 0; i < products.length; i++) {
      productNames.push(products[i].productName);
    }
    return productNames;
  }

  private resetReceiptSendChannels() {
    const entity = this.editForm.value;
    entity.receiptSendChannels = this.basicReceiptSendChannels;
    // const labelBasic = ' (базовый)';
    // const basicReceiptSendChannels: any = [];
    // for (let b = 0; b < this.basicReceiptSendChannels.length; b++) {
    //   basicReceiptSendChannels.push(this.basicReceiptSendChannels[b] + labelBasic);
    // }
    // entity.receiptSendChannels = basicReceiptSendChannels;

    this.editForm.setValue(entity);
  }
}
