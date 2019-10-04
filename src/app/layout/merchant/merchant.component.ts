import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToMerchant, merchantToDto } from '../../core/model/merchant.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  merchants: any = [];
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
      shortMerchantId: [''],
      mcc: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      taxId: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllMerchants()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const merchant: any = data.content[i];
            var entity: any = dtoToMerchant(merchant);
            entity.shortMerchantId = merchant.merchantId.substring(0, 10);
            this.merchants.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
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
    const dto = merchantToDto(this.editForm.value);

    this.apiService.updateMerchant(dto.merchantId, dto)
      .pipe(first())
      .subscribe(
        data => {
          // this.closeMerchant();
          this.pageRefresh(); // updated successfully.
        },
        error => {
          alert(JSON.stringify(error));
        });
    }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllMerchants()
      .subscribe( data => {
          console.log(data)
          this.merchants = [];
          for (let i = 0; i < data.content.length; i++) {
            const merchant: any = data.content[i];
            var entity: any = dtoToMerchant(merchant);
            entity.shortMerchantId = merchant.merchantId.substring(0, 10);
            this.merchants.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }
}
