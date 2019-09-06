import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import {dtoToTransaction, filterTransactionEmpty} from '../../core/model/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions;
  terminalGroups;
  filterForm: FormGroup;
  @ViewChild('filterTransaction') filterTransaction: DialogComponent;
  showCloseIcon: Boolean = true;
  width: string = '340px';
  isModal: Boolean = false;
  target: string = '.control-section';
  animationSettings: Object = { effect: 'None' };

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

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
            const transaction: any = data.content[i];
            var entity: any = dtoToTransaction(transaction);
            transactions.push(entity);
          }
          this.transactions = transactions;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    this.apiService.findAllServiceGroups()
      .subscribe( data => {
          console.log(data)
          const terminalGroups: any = data
          this.terminalGroups = terminalGroups.content;
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
      const entity = filterTransactionEmpty();
      this.filterForm.setValue(entity);
    };
  }

  offFilterTransaction: EmitType<object> = () => {
  }

  openFilterTransaction: EmitType<object> = () => {
    document.getElementById('filterTransaction').style.display = 'block';
    this.isModal = true;
    this.filterTransaction.show();
  }
}
