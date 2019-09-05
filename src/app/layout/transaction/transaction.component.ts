import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import {Router} from '@angular/router';
import {ApiService} from '../../core/service/api.service';
import {dtoToTransaction} from '../../core/model/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  transactions;
  terminalGroups;

  @ViewChild('filterTransaction')
  filterTransaction: DialogComponent;
  showCloseIcon: Boolean = true;
  width: string = '300px';
  isModal: Boolean = false;
  target: string = '.control-section2';
  animationSettings: Object = { effect: 'None' };

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

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
    location.reload();
  }

  onOpenFilterTransaction: EmitType<object> = () => {
    (document.getElementById('btnApply') as any).keypress = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    (document.getElementById('inValue')as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    document.getElementById('btnApply').onclick = (): void => {
      this.updateTextValue();
    };
  }

  onCloseFilterTransaction: EmitType<object> = () => {
  }

  openFilterTransaction: EmitType<object> = () => {
    document.getElementById('filterTransaction').style.display = 'block';
    this.isModal = true;
    this.filterTransaction.show();
  }

  private updateTextValue: EmitType<object> = () => {
    let enteredValue: HTMLInputElement = document.getElementById('inValue') as HTMLInputElement;
    let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
    if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
      detach(document.getElementsByClassName('contentText')[0]);
    }
    if (enteredValue.value !== '') {
      dialogTextElement.innerHTML = enteredValue.value;
    }
    enteredValue.value = '';
  }
}
