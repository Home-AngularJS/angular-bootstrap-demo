import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { attestationNew, attestationToUpdate, dtoToAttestation } from '../../core/model/attestation.model';
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

  attestations: any = [];
  editForm: FormGroup;
  selectedAttestation;
  selectedAttestationId;
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
      id: [''],
      attestationPhase: [''],
      date: [''],
      integrity: [''],
      root: [''],
      debug: [''],
      emulator: [''],
      geoPosition: [''],
      velocity: [''],
      channelIntegrity: [''],
      declined: [''],
      deviceName: ['']
    });

    this.filterForm = this.formBuilder.group({
      merchantId: [''],
      shortMerchantId: [''],
      mcc: [''],
      merchantLegalName: [''],
      merchantLocation: [''],
      merchantName: [''],
      taxId: [''],
      bankName: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllAttestations()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const attestation: any = data.content[i];
            var entity: any = dtoToAttestation(attestation);
            entity.id = attestation.id.substring(0, 10);
            this.attestations.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
  }

  public createAttestation() {
    const attestation: any = attestationNew();
    console.log(attestation)
    this.selectedAttestation = attestation;
    this.editForm.setValue(attestation);
  }

  public selectAttestation(attestation) {
    console.log(attestation);
    this.selectedAttestation = attestation;
    this.editForm.setValue(attestation);
  }

  public selectAttestationId(attestation) {
    if (this.selectedAttestationId === attestation.id) {
      this.selectAttestation(attestation);
    } else {
      this.selectedAttestationId = attestation.id;
    }
  }

  public closeAttestation() {
    this.selectedAttestation = null;
  }

  public onFilterMerchant: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      // this.apiService.findMerchants(this.filterForm.value)
      //   .subscribe( data => {
      //       this.merchants = [];
      //       for (let i = 0; i < data.content.length; i++) {
      //         const merchant: any = data.content[i];
      //         var entity: any = dtoToMerchant(merchant);
      //         entity.shortMerchantId = merchant.merchantId.substring(0, 10);
      //         this.merchants.push(entity);
      //       }
      //       this.filterMerchant.hide();
      //     },
      //     error => {
      //       alert( JSON.stringify(error) );
      //       // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      //     });
    };

    // reset Filter:
    // document.getElementById('btnCancel').onclick = (): void => {
    //   this.filterForm.setValue(filterMerchantEmpty());
    //   this.apiService.findMerchants(this.filterForm.value)
    //     .subscribe( data => {
    //         this.merchants = [];
    //         for (let i = 0; i < data.content.length; i++) {
    //           const merchant: any = data.content[i];
    //           var entity: any = dtoToMerchant(merchant);
    //           entity.shortMerchantId = merchant.merchantId.substring(0, 10);
    //           this.merchants.push(entity);
    //         }
    //         this.filterMerchant.hide();
    //       },
    //       error => {
    //         alert( JSON.stringify(error) );
    //         // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
    //       });
    // };
  }

  public offFilterMerchant: EmitType<object> = () => {
  }

  public openFilterMerchant: EmitType<object> = () => {
    document.getElementById('filterMerchant').style.display = 'block';
    this.isModalFilter = true;
    this.filterMerchant.show();
  }

  public onSubmit() {
    const entity = this.editForm.value;
    const dto = attestationToUpdate(entity);

    this.apiService.saveAttestationParams(entity.id, dto)
      .pipe(first())
      .subscribe(
        data => {
          // this.closeMerchant();
          this.pageRefresh(); // updated successfully.
        },
        error => {
          alert(JSON.stringify(error));
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllAttestations()
      .subscribe( data => {
          console.log(data)
          this.attestations = [];
          for (let i = 0; i < data.content.length; i++) {
            const attestation: any = data.content[i];
            var entity: any = dtoToAttestation(attestation);
            entity.id = attestation.id.substring(0, 10);
            this.attestations.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
