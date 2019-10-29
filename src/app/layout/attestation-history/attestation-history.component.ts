import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { filterAttestationHistoryFormEmpty } from '../../core/model/attestation.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { AttestationHistoryService } from '../../core/service/attestation-history.service';
import { AttestationHistoryDefaultSettings } from '../../core/service/attestation-history-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';

const providers = [{
  provide: SmartTable,
  useFactory: (attestationHistoryService: AttestationHistoryService, settings: TableState) => of([], settings, server({
    query: (tableState) => attestationHistoryService.queryAttestationHistory(tableState)
  })),
  deps: [AttestationHistoryService, AttestationHistoryDefaultSettings]
}];

@Component({
  selector: 'app-attestation-history',
  templateUrl: './attestation-history.component.html',
  styleUrls: ['./attestation-history.component.css'],
  providers
})
export class AttestationHistoryComponent implements OnInit {
  filterForm: FormGroup;
  @ViewChild('filterAttestationHistory') filterAttestationHistory: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };
  public title;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService, private attestationHistoryService: AttestationHistoryService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.filterForm = this.formBuilder.group({
      deviceSn: [''],
      deviceName: [''],
      attestationPhase: [''],
      date: ['']
    });

    /**
     * PROD. Profile
     */

    /**
     * DEV. Profile
     */
  }

  public onFilterAttestationHistory: EmitType<object> = () => {
    // do Filter:
    // document.getElementById('btnApply').onclick = (): void => {
      // this.apiService.findMerchants(this.filterForm.value)
      //   .subscribe( data => {
      //       this.merchants = [];
      //       for (let i = 0; i < data.content.length; i++) {
      //         const merchant: any = data.content[i];
      //         var entity: any = dtoToMerchant(merchant);
      //         entity.shortMerchantId = merchant.merchantId.substring(0, 10);
      //         this.merchants.push(entity);
      //       }
      //       this.filterAttestationHistory.hide();
      //     },
      //     error => {
      //       alert( JSON.stringify(error) );
      //       // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      //     });
    // };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterAttestationHistoryFormEmpty());
    };
  }

  public offFilterAttestationHistory: EmitType<object> = () => {
  }

  public openFilterAttestationHistory: EmitType<object> = () => {
    this.filterForm.setValue(this.attestationHistoryService.filter);

    document.getElementById('filterAttestationHistory').style.display = 'block';
    this.isModalFilter = true;
    this.filterAttestationHistory.show();
  }

  public selectLastPage(length: any, size: any) {
    const _length = parseInt(length);
    const _size = parseInt(size);
    const max = _length / _size;
    const _lastPage = Math.round(max);
    return (_lastPage < max) ? _lastPage + 1 : _lastPage;
  }

  public testPage(select: any) {
    console.log(select)
    return parseInt(select);
  }
}
