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

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  terminals;
  selectedTerminal;
  selectedTerminalId;
  serviceGroups;
  editForm: FormGroup;
  takeChoices: any;
  selectedServiceGroup;
  allAllowedLanguages = [];
  allowedLanguagesSettings = {};
  findDevice: any;
  devices;
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
  filterForm: FormGroup;
  @ViewChild('filterTerminal') filterTerminal: DialogComponent;
  showCloseIcon: Boolean = true;
  width: string = '400px';
  isModal: Boolean = false;
  target: string = '.control-section';
  animationSettings: Object = { effect: 'None' };

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

    this.allowedLanguagesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
    };

    this.ipsNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      disabled: true
    };

    this.productNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все'
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
      acquirerId: [''],
      allowedLanguages: [''],
      beginMask: ['', Validators.required],
      endMask: ['', Validators.required],
      maskSymbol: ['', Validators.required],
      productNames: [''],
      ipsNames: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
      opQr: [''],
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
        });

    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          this.receiptTemplates = data.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllTerminals()
      .subscribe( data => {
          console.log(data)
          this.terminals = this.terminalToDto(data.content);
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const terminalGroups: any = data.content
          this.serviceGroups = terminalGroups;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.terminals = this.dataService.findAllTerminals().content;
    this.devices = this.dataService.getDevices();
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

  onItemSelect(item: any) {
  }

  onSelectAll(items: any) {
  }

  public selectServiceGroupByNumber(groupNumber) {
    console.log(groupNumber)
    for (let i = 0; i < this.serviceGroups.length; i++) {
      if (this.serviceGroups[i].groupNumber === groupNumber) {
        this.selectedServiceGroup = Object.assign({}, this.serviceGroups[i]); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
      }
    }
    console.log(this.selectedServiceGroup);
  }

  findDeviceByTerminalId(terminalId: any) {
    this.apiService.findDeviceByTerminalId(terminalId)
      .subscribe( data => {
          console.log(data);
          const anyData: any = data;
          const device = anyData;
          this.findDevice = device;
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  onSubmit() {
    const entity = this.dtoToTerminal(this.editForm.value);
    const update = terminalToUpdate(entity);

    this.apiService.updateTerminal(this.selectedTerminal.terminalId, update)
      .pipe(first())
      .subscribe(
        data => {
          this.closeTerminal();
          this.pageRefresh(); // updated successfully.
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  public closeTerminal() {
    this.selectedTerminal = null;
  }

  public closeServiceGroupByNumber() {
    this.selectedServiceGroup = null;
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllTerminals()
      .subscribe( data => {
          this.terminals = this.terminalToDto(data.content);
        },
        error => {
          alert( JSON.stringify(error) );
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
          });
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      const entity = filterTerminalEmpty();
      this.filterForm.setValue(entity);
    };
  }

  public offFilterTerminal: EmitType<object> = () => {
  }

  public openFilterTerminal: EmitType<object> = () => {
    document.getElementById('filterTerminal').style.display = 'block';
    this.isModal = true;
    this.filterTerminal.show();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  private terminalToDto(terminals: any) {
    for (let i = 0; i < terminals.length; i++) {
      terminals[i].deviceName = this.dtoToDevices(this.devices);
      terminals[i].ipsNames = this.dtoToAllowedIpsCardGroups(terminals[i].allowedIpsCardGroups);
      terminals[i].productNames = this.dtoToProducts(terminals[i].products);
      terminals[i].receiptTemplateId = terminals[i].receiptTemplate.id;
    }
    return terminals;
  }

  private dtoToTerminal(entity: any) {
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

  private dtoToDevices(devices: any) {
    const randomDevice = this.getRandomInt(0, devices.length-1);
    return devices[randomDevice].deviceName;
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
}
