import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { dtoToTransaction, filterTransactionEmpty } from '../../core/model/transaction.model';
import { dtoToTerminal } from '../../core/model/terminal.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions;
  selectedTerminal;
  takeChoices: any;
  filterForm: FormGroup;
  @ViewChild('filterTransaction') filterTransaction: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };
  @ViewChild('viewTerminal') viewTerminal: DialogComponent;
  isModalView: Boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.takeChoices = this.dataService.getTakeChoices();

    this.filterForm = this.formBuilder.group({
      panMasked: [''],
      approvalCode: [''],
      rrn: [''],
      terminalId: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllTransactions()
      .subscribe( data => {
          console.log(data)
          const transactions: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const transaction: any = dtoToTransaction(data.content[i]);
            transaction.statusCodeColor = (transaction.statusCode==='Success') ? '#2ECC71' : '#FF5733';
            transactions.push(transaction);
          }
          this.transactions = transactions;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const serviceGroups: any = data
          this.serviceGroups = serviceGroups.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.transactions = this.dataService.findAllTransactions();
    // this.serviceGroups = this.dataService.findAllServiceGroups();
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllTransactions()
      .subscribe( data => {
          console.log(data)
          const transactions: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const transaction: any = data.content[i];
            var entity: any = dtoToTransaction(transaction);
            transactions.push(entity);
          }
          this.transactions = transactions;
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }

  onFilterTransaction: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      this.apiService.findTransactions(this.filterForm.value)
        .subscribe( data => {
            console.log(data)
            const transactions: any = [];
            for (let i = 0; i < data.content.length; i++) {
              const transaction: any = data.content[i];
              const entity: any = dtoToTransaction(transaction);
              transactions.push(entity);
            }
            this.transactions = transactions;
            this.filterTransaction.hide();
          },
          error => {
            alert( JSON.stringify(error) );
          });
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterTransactionEmpty());
      this.apiService.findTransactions(this.filterForm.value)
        .subscribe( data => {
            console.log(data)
            const transactions: any = [];
            for (let i = 0; i < data.content.length; i++) {
              const transaction: any = data.content[i];
              const entity: any = dtoToTransaction(transaction);
              transactions.push(entity);
            }
            this.transactions = transactions;
            this.filterTransaction.hide();
          },
          error => {
            alert( JSON.stringify(error) );
          });
    };
  }

  offFilterTransaction: EmitType<object> = () => {
  }

  openFilterTransaction: EmitType<object> = () => {
    document.getElementById('filterTransaction').style.display = 'block';
    this.isModalFilter = true;
    this.filterTransaction.show();
  }

  public onTerminalById: EmitType<object> = () => {
  }

  public offTerminalById: EmitType<object> = () => {
  }

  public selectTerminalById(terminalId: any) {
    this.apiService.findTerminals({'terminalId': terminalId})
      .subscribe( data => {
          console.log(data)
          const terminals = data.content;
          if (terminals.length > 0) {
            const entity: any = dtoToTerminal(terminals[0]);
            entity.dateTimeInit = new Date(entity.dateTimeInit);
            entity.receiptTemplateId = entity.receiptTemplate.id;
            const ipsNames: any = [];
            for (let i = 0; i < terminals[0].allowedIpsCardGroups.length; i++) {
              ipsNames.push(terminals[0].allowedIpsCardGroups[i].ipsName);
            }
            entity.ipsNames = ipsNames;
            this.selectedTerminal = entity;
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });
    document.getElementById('viewTerminal').style.display = 'block';
    this.isModalView = true;
    this.viewTerminal.show();
  }
}
