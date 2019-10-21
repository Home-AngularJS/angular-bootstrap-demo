import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../../core/service/api.service';
import { first } from 'rxjs/operators';
import { bankInfoToDto, dtoToBankInfo } from '../../core/model/bank-info.model';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.css']
})
export class BankInfoComponent implements OnInit {

  editForm: FormGroup;
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
      id: [''],
      address: [''],
      phone: [''],
      email: [''],
      instructions: [''],
      appVersion: ['']
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
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
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

  public closeBankInfo() {
    this.selectedBankInfo = null;
  }

  public onSubmit() {
    const entity = this.editForm.value;
    const dto = bankInfoToDto(entity);
    this.apiService.updateBankInfo(dto)
      .pipe(first())
      .subscribe(
        data => {
          this.pageRefresh(); // updated successfully.
          // this.closeBankInfo();
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
    }

  public pageRefresh() {
    // location.reload();
    this.apiService.getBankInfo()
      .subscribe( data => {
          console.log(data)
          this.bankInfo = data;
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

}
