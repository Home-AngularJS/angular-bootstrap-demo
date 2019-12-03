import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bankNew, bankToDto, createNewBank, dtoToBank } from '../../core/model/bank.model';
import { first } from 'rxjs/operators';
import { dtoToBankInfo } from '../../core/model/bank-info.model';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  banks: any = [];
  editForm: FormGroup;
  selectedBank;
  selectedBankId;
  bankInfo;
  selectedBankInfo;
  selectedBankInfoId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      address: [''],
      id: [''],
      mfo: [''],
      name: [''],
      phoneNumber: [''],
      taxId: [''],
      bankInfo: [''],
    });

    /**
     * PROD. Profile
     */
    this.apiService.getBankInfo()
      .subscribe( data => {
          console.log(data)
          this.bankInfo = dtoToBankInfo(data);
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const bank: any = data.content[i];
            var entity: any = dtoToBank(bank);
            entity.bankInfo = this.bankInfo;
            this.banks.push(entity);
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public selectBank(bank) {
    console.log(bank);
    this.selectedBank = bank;
    this.editForm.setValue(bank);
  }

  public selectBankId(bank) {
    if (this.selectedBankId === bank.id) {
      this.selectBank(bank);
    } else {
      this.selectedBankId = bank.id;
    }
  }

  public selectBankInfo(bankInfo) {
    console.log(bankInfo);
    this.selectedBankInfo = Object.assign({}, bankInfo); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    this.editForm.setValue(this.selectedBankInfo);
  }

  public selectBankInfoId(bankInfo) {
    if (this.selectedBankInfoId === bankInfo.id) {
      this.selectBankInfo(bankInfo);
    } else {
      this.selectedBankInfoId = bankInfo.id;
    }
  }

  public createBank() {
    this.selectedBankId = null;
    var bank = bankNew();
    this.selectBank(bank);
  }

  public closeBank() {
    this.selectedBankId = null;
    this.selectedBank = null;
  }

  public onSubmit() {
    const dto = bankToDto(this.editForm.value);

    if (dto.id === null) {
      var newBank = createNewBank(dto);
      this.apiService.createBank(newBank)
        .pipe(first())
        .subscribe(
          data => {
            // this.closeBank();
            this.pageRefresh(); // create successfully.
          },
          error => {
            alert(JSON.stringify(error));
          });
    } else {
      this.apiService.updateBank(dto.id, dto)
        .pipe(first())
        .subscribe(
          data => {
            // this.closeBank();
            this.pageRefresh(); // updated successfully.
          },
          error => {
            alert(JSON.stringify(error));
          });
    }
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          this.banks = [];
          for (let i = 0; i < data.content.length; i++) {
            const bank: any = data.content[i];
            var entity: any = dtoToBank(bank);
            this.banks.push(entity);
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }
}
