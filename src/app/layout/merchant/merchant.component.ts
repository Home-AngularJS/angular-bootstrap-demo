import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { DataService } from '../../core/service/data.service';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToMerchant, filterMerchantEmpty, merchantToDto } from '../../core/model/merchant.model';

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
  filterForm: FormGroup;
  @ViewChild('filterMerchant') filterMerchant: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };

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
      taxId: [''],
      bankName: ['']
    });

    this.filterForm = this.formBuilder.group({
      merchantId: [''],
      merchantName: [''],
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
          // alert( JSON.stringify(error) );
          this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
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

  public onFilterMerchant: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      this.apiService.findMerchants(this.filterForm.value)
        .subscribe( data => {
            for (let i = 0; i < data.content.length; i++) {
              const merchant: any = data.content[i];
              var entity: any = dtoToMerchant(merchant);
              entity.shortMerchantId = merchant.merchantId.substring(0, 10);
              this.merchants.push(entity);
            }
            this.filterMerchant.hide();
          },
          error => {
            // alert( JSON.stringify(error) );
            this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterMerchantEmpty());
      this.apiService.findMerchants(this.filterForm.value)
        .subscribe( data => {
            for (let i = 0; i < data.content.length; i++) {
              const merchant: any = data.content[i];
              var entity: any = dtoToMerchant(merchant);
              entity.shortMerchantId = merchant.merchantId.substring(0, 10);
              this.merchants.push(entity);
            }
            this.filterMerchant.hide();
          },
          error => {
            // alert( JSON.stringify(error) );
            this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    };
  }

  public offFilterMerchant: EmitType<object> = () => {
  }

  public openFilterMerchant: EmitType<object> = () => {
    document.getElementById('filterMerchant').style.display = 'block';
    this.isModalFilter = true;
    this.filterMerchant.show();
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
          // alert( JSON.stringify(error) );
          this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
