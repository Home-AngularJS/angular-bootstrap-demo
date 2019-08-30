import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToMerchant } from '../../core/model/merchant.model';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  merchants;
  editForm: FormGroup;
  selectedMerchant;
  selectedMerchantId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      merchantId: [''],
      merchantName: [''],
      merchantLocation: [''],
      taxId: [''],
      mcc: [''],
      acquirerId: ['']
    });

    /**
     * PROD. Profile
     */


    /**
     * DEV. Profile
     */
    const data = this.dataService.findAllMerchants();
    console.log(data)
    const merchants: any = [];
    for (let i = 0; i < data.content.length; i++) {
      const merchant: any = data.content[i];
      var entity: any = dtoToMerchant(merchant);
      merchants.push(entity);
    }
    this.merchants = merchants;
  }

  public createMerchant() {
    const merchant: any = {
      'merchantId': null,
      'merchantName': null,
      'merchantLocation': null,
      'taxId': null,
      'mcc': null,
      'acquirerId': null
    };
    console.log(merchant)
    this.selectedMerchant = merchant;
    this.editForm.setValue(merchant);
  }

  public selectMerchant(merchant) {
    console.log(merchant);
    this.selectedMerchant = merchant;
    this.editForm.setValue(merchant);
  }

  public selectMerchantId(merchant) {
    if (this.selectedMerchantId === merchant.merchantId) {
      this.selectMerchant(merchant);
    } else {
      this.selectedMerchantId = merchant.merchantId;
    }
  }

  public closeMerchant() {
    this.selectedMerchant = null;
  }

  public onSubmit() {
    const merchant = this.editForm.value;


    if (merchant.merchantId === null) {
      // this.dataService.createMerchant(merchant);
      // // this.pageRefresh(); // created successfully.
      this.closeMerchant();
    } else {
      // this.dataService.updateMerchant(merchant);
      // // this.pageRefresh(); // updated successfully.
      this.closeMerchant();
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
