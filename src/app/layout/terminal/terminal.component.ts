import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToTerminal, terminalToDto, filterTerminalEmpty } from '../../core/model/terminal.model';

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
      visaAccepted: [''],
      mcAccepted: [''],
      prostirAccepted: [''],
      oneTransactionLimit: [''],
      noPinLimit: [''],
    });

    this.filterForm = this.formBuilder.group({
      terminalId: [''],
      groupNumber: [''],
      dateTimeInit: [''],
      merchantName: [''],
      legalName: ['']
    });

    /**
     * PROD. Profile
     */
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
          for (let i = 0; i < terminals.length; i++) {
            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            terminals[i].productNames = productNames;
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
    this.products = this.dataService.findAllProducts();
    this.productNames = this.dataService.getAllProductNames();
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
    const dto = terminalToDto(this.editForm.value);
    this.apiService.updateTerminal(dto)
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
          for (let i = 0; i < terminals.length; i++) {
            const randomProduct = this.getRandomInt(0, this.products.length-1);
            const product = this.products[randomProduct];
            const productNames: any = [];
            productNames.push(product.productName);
            terminals[i].productNames = productNames;
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
            for (let i = 0; i < terminals.length; i++) {
              const randomProduct = this.getRandomInt(0, this.products.length-1);
              const product = this.products[randomProduct];
              const productNames: any = [];
              productNames.push(product.productName);
              terminals[i].productNames = productNames;
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
