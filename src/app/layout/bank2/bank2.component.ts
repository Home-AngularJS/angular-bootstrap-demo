import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { multiselectToEntity } from '../../core/model/receipt-send-channel.model';
import {
  attestationActionsToUpdate,
  attestationThreadsToUpdate,
  attestationThreatSequenceNew,
  nameToAttestationActionKeys,
  dtoToAttestationActions,
  nameToAttestationThreadKeys,
  dtoToAttestationThreads,
  dtoToAttestationThreatSequence,
  valuesToAttestationActionKeys,
  updateAttestationThreatSequence
} from '../../core/model/attestation.model';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import {bankToDto, dtoToBank} from '../../core/model/bank.model';

@Component({
  selector: 'app-bank2',
  templateUrl: './bank2.component.html',
  styleUrls: ['./bank2.component.css']
})
export class Bank2Component implements OnInit {
  banks: any = [];
  selectedBank;
  selectedBankId;
  // attestationThreadlogs = [];
  takeChoices;
  statusChoices;
  allAttestationThreads;
  // selectedAttestationThreadlog;
  // selectedAttestationThreadlogId;
  allAttestationActionNames = [];
  attestationActionNamesSettings = {};
  attestationThreadlogForm: FormGroup;
  @ViewChild('attestationThreadlog') attestationThreadlog: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalAttestationThreadlog: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.attestationThreadlogForm = this.formBuilder.group({
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
    this.attestationActionNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      // maxHeight: 90,
    };
    this.allAttestationActionNames = this.dataService.getAllAttestationActionNames();

    this.allAttestationThreads = this.dataService.getAllAttestationThreads();
    this.takeChoices = this.dataService.getTakeChoices();
    this.statusChoices = this.dataService.getStatusChoices();

    /**
     * PROD. Profile
     */
    // this.apiService.findAllAttestationThreatSequences()
    //   .subscribe( data => {
    //       console.log(data)
    //       this.attestationThreadlogs = [];
    //       for (let i = 0; i < data.content.length; i++) {
    //         this.attestationThreadlogs.push(dtoToAttestationThreatSequence(data.content[i]));
    //       }
    //     },
    //     error => {
    //       // alert( JSON.stringify(error) );
    //     });

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
      this.attestationThreadlogForm.setValue(bank);
      this.openAttestationThreadlog();
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

  private delay() {
    const ms: number = 350;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public openAttestationThreadlog: EmitType<object> = () => {
    document.getElementById('attestationThreadlog').style.display = 'block';
    this.isModalAttestationThreadlog = true;
    this.attestationThreadlog.show();
  }

  public onAttestationThreadlog: EmitType<object> = () => {
    // save or update:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.attestationThreadlogForm.value;
      console.log(entity)

      if (entity.id === null) {
        const entityUpdate: any = bankToDto(entity)
        this.apiService.createBank(entityUpdate)
          .pipe(first())
          .subscribe(
            data => {
              this.pageRefresh(); // updated successfully.
              this.attestationThreadlog.hide();
              this.showSuccess('Создать', 'Бaнк');
            },
            error => {
              this.showError('Создать', 'Бaнк');
            });
      } else {
        this.apiService.updateBank(entity.id, bankToDto(entity))
          .pipe(first())
          .subscribe(
            data => {
              this.pageRefresh(); // updated successfully.
              this.attestationThreadlog.hide();
              this.showSuccess('Сохранить', 'Бaнк');
            },
            error => {
              this.showError('Сохранить', 'Бaнк');
            });
      }
    };

    // cancel:
    document.getElementById('btnCancel').onclick = (): void => {
      this.attestationThreadlog.hide();
    };
  }

  public offAttestationThreadlog: EmitType<object> = () => {
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
