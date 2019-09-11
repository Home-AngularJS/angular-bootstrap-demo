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
  myDatePickerOptions: any;
  filterDatePickerOptions: any;
  dateTimeInit;
  productNames: any = [];
  productNames2: any = [];
  allowedIpsCardGroups: any = [];
  receiptTemplate2: any;
  originalProducts: any = [];
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
      noDataAvailablePlaceholderText: 'нет данных'
    };

    this.productNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных'
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
      receiptTemplate2: [''],
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
      allowedIpsCardGroups: [''],
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
          const productNames2: any = data.content
          this.productNames2 = productNames2;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllProducts()
      .subscribe( data => {
          console.log(data)
          const originalProducts: any = data.content
          this.originalProducts = originalProducts;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllTerminals()
      .subscribe( data => {
          const anyData: any = data;
          const terminals = anyData.content;
          //TODO deviceName
          for (let i = 0; i < terminals.length; i++) {
            const randomDevice = this.getRandomInt(0, this.devices.length-1);
            const device = this.devices[randomDevice];
            terminals[i].deviceName = device.deviceName;
          }
          //TODO productID
          const productNames2: any = [];
          for (let p = 0; p < this.productNames2.length; p++) {
            const productName = this.productNames2[p];
            productNames2.push(productName.ipsName);
          }
          this.productNames = productNames2;

          for (let i = 0; i < terminals.length; i++) {
            const allowedIpsCardGroups: any = [];
            for (let a = 0; a < terminals[i].allowedIpsCardGroups.length; a++) {
              const allowedIpsCardGroup = terminals[i].allowedIpsCardGroups[a];
              allowedIpsCardGroups.push(allowedIpsCardGroup.ipsName);
            }
            // terminals[i].productNames = allowedIpsCardGroups;
            terminals[i].allowedIpsCardGroups = allowedIpsCardGroups;
            this.allowedIpsCardGroups = allowedIpsCardGroups;

            // console.log(this.productNames)
            // console.log(this.allowedIpsCardGroups)

            // // console.log(this.originalProducts)
            // const originalProducts: any = [];
            // for (let o = 0; o < this.originalProducts.length; o++) {
            //   const originalProduct = this.originalProducts[o];
            //   originalProducts.push(originalProduct.productName);
            // }
            // terminals[i].productNames = originalProducts;

            const productNames: any = [];
            for (let p = 0; p < terminals[i].products.length; p++) {
              const product = terminals[i].products[p];
              productNames.push(product.productName);
            }
            terminals[i].productNames = productNames;

            terminals[i].receiptTemplate2 = terminals[i].receiptTemplate.id;
            this.receiptTemplate2 = terminals[i].receiptTemplate.id;
          }
          this.terminals = terminals;
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
    entity.receiptTemplate2 = terminal.receiptTemplate2;
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
    const entity: any = this.editForm.value;
    entity.originalProducts = this.originalProducts;

    // console.log(entity)

    const ipsCardGroupIdList: any = [];
    for (let i = 0; i < this.productNames2.length; i++) {
      const ipsCardGroupIdEntity = this.productNames2[i];
      for (let j = 0; j < entity.allowedIpsCardGroups.length; j++) {
        if (ipsCardGroupIdEntity.ipsName === entity.allowedIpsCardGroups[j]) {
          ipsCardGroupIdList.push(ipsCardGroupIdEntity.ipsCardGroupId);
        }
      }
    }
    entity.ipsCardGroupIdList = ipsCardGroupIdList;

    const productIdList: any = [];
    for (let i = 0; i < this.selectedTerminal.products.length; i++) {
      const product = this.selectedTerminal.products[i];
      console.log(product)
      productIdList.push(product.productId);
    }
    entity.productIdList = productIdList;

    const update = terminalToUpdate(entity);

    this.apiService.updateTerminal(this.selectedTerminal.terminalId, update)
      .pipe(first())
      .subscribe(
        data => {
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
          const anyData: any = data;
          const terminals = anyData.content;
          //TODO deviceName
          for (let i = 0; i < terminals.length; i++) {
            const randomDevice = this.getRandomInt(0, this.devices.length-1);
            const device = this.devices[randomDevice];
            terminals[i].deviceName = device.deviceName;
          }
          //TODO productID
          const productNames2: any = [];
          for (let p = 0; p < this.productNames2.length; p++) {
            const productName = this.productNames2[p];
            productNames2.push(productName.ipsName);
          }
          this.productNames = productNames2;

          for (let i = 0; i < terminals.length; i++) {
            const allowedIpsCardGroups: any = [];
            for (let a = 0; a < terminals[i].allowedIpsCardGroups.length; a++) {
              const allowedIpsCardGroup = terminals[i].allowedIpsCardGroups[a];
              allowedIpsCardGroups.push(allowedIpsCardGroup.ipsName);
            }
            terminals[i].allowedIpsCardGroups = allowedIpsCardGroups;
            this.allowedIpsCardGroups = allowedIpsCardGroups;

            const productNames: any = [];
            for (let p = 0; p < terminals[i].products.length; p++) {
              const product = terminals[i].products[p];
              productNames.push(product.productName);
            }
            terminals[i].productNames = productNames;

            terminals[i].receiptTemplate2 = terminals[i].receiptTemplate.id;
            this.receiptTemplate2 = terminals[i].receiptTemplate.id;
          }
          this.terminals = terminals;
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
            const anyData: any = data;
            const terminals = anyData.content;
            //TODO deviceName
            for (let i = 0; i < terminals.length; i++) {
              const randomDevice = this.getRandomInt(0, this.devices.length-1);
              const device = this.devices[randomDevice];
              terminals[i].deviceName = device.deviceName;
            }
            //TODO productID
            const productNames2: any = [];
            for (let p = 0; p < this.productNames2.length; p++) {
              const productName = this.productNames2[p];
              productNames2.push(productName.ipsName);
            }
            this.productNames = productNames2;

            for (let i = 0; i < terminals.length; i++) {
              const allowedIpsCardGroups: any = [];
              for (let a = 0; a < terminals[i].allowedIpsCardGroups.length; a++) {
                const allowedIpsCardGroup = terminals[i].allowedIpsCardGroups[a];
                allowedIpsCardGroups.push(allowedIpsCardGroup.ipsName);
              }
              terminals[i].allowedIpsCardGroups = allowedIpsCardGroups;
              this.allowedIpsCardGroups = allowedIpsCardGroups;

              const productNames: any = [];
              for (let p = 0; p < terminals[i].products.length; p++) {
                const product = terminals[i].products[p];
                productNames.push(product.productName);
              }
              terminals[i].productNames = productNames;

              terminals[i].receiptTemplate2 = terminals[i].receiptTemplate.id;
              this.receiptTemplate2 = terminals[i].receiptTemplate.id;
            }
            this.terminals = terminals;
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
}
