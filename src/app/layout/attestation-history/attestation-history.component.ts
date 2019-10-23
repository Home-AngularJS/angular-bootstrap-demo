import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {attestationToUpdate, dtoToAttestation} from '../../core/model/attestation.model';

@Component({
  selector: 'app-attestation-history',
  templateUrl: './attestation-history.component.html',
  styleUrls: ['./attestation-history.component.css']
})
export class AttestationHistoryComponent implements OnInit {

  attestations: any = [];
  editForm: FormGroup;
  selectedAttestation;
  selectedAttestationId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      action: [''],
      actionWeight: ['']
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

  public selectAttestation(attestation) {
    console.log(attestation);
    this.selectedAttestation = attestation;
    this.editForm.setValue(attestation);
  }

  public selectAttestationId(attestation) {
    if (this.selectedAttestationId === attestation.action) {
      this.selectAttestation(attestation);
    } else {
      this.selectedAttestationId = attestation.action;
    }
  }

  public closeAttestation() {
    this.selectedAttestation = null;
  }

  public onSubmit() {
    const entity = this.editForm.value;
    const dto = attestationToUpdate(entity);

    this.apiService.saveAttestationParams(entity.action, dto)
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
            this.attestations.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
