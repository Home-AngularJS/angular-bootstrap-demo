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

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  banks: any = [];
  selectedBank;
  selectedBankId;
  bankForm: FormGroup;
  @ViewChild('bank') bank: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalBank: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.bankForm = this.formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      email: [''],
      phone: [''],
      taxId: [''],
      mfo: [''],
      instructions: [''],
    });

    /**
     * DEV. Profile
     */

    /**
     * PROD. Profile
     */
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            this.banks.push(dtoToBank(data.content[i]));
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  public selectBank(bank) {
    console.log(bank);
    this.selectedBank = bank;
    if (bank != null) {
      this.bankForm.setValue(bank);
      this.openBank();
    }
  }

  public selectBankId(bank) {
    if (this.selectedBankId === bank.id) {
      this.selectBank(bank);
    } else {
      this.selectedBankId = bank.id;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
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

  public openBank: EmitType<object> = () => {
    document.getElementById('bank').style.display = 'block';
    this.isModalBank = true;
    this.bank.show();
  }

  public onBank: EmitType<object> = () => {
    // save or update:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.bankForm.value;
      console.log(entity)

      if (entity.id === null) {
        const entityUpdate: any = bankToDto(entity)
        this.apiService.createBank(entityUpdate)
          .pipe(first())
          .subscribe(
            data => {
              this.bank.hide();
              this.showSuccess('Создать', 'Бaнк');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Создать', 'Бaнк');
            });
      } else {
        this.apiService.updateBank(entity.id, bankToDto(entity))
          .pipe(first())
          .subscribe(
            data => {
              this.bank.hide();
              this.showSuccess('Сохранить', 'Бaнк');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Сохранить', 'Бaнк');
            });
      }
    };

    // cancel:
    document.getElementById('btnCancel').onclick = (): void => {
      this.bank.hide();
    };
  }

  public offBank: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public pageRefresh() {
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          this.banks = [];
          for (let i = 0; i < data.content.length; i++) this.banks.push(dtoToBank(data.content[i]));
          this.showSuccess('Обновить', 'Бaнки');
        },
        error => {
          this.showError('Обновить', 'Бaнки');
        });
  }
}
