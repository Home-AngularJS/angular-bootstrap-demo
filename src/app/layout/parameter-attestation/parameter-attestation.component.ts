import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-parameter-attestation',
  templateUrl: './parameter-attestation.component.html',
  styleUrls: ['./parameter-attestation.component.css']
})
export class ParameterAttestationComponent implements OnInit {

  attestationActions;
  attestationThreads;
  attestationThreadlogs;
  takeChoices;
  statusChoices;
  allAttestationActions;
  editFormAttestationActions: FormGroup;
  editFormAttestationThreads: FormGroup;
  editFormAttestationThreadlogs: FormGroup;
  selectedAttestationThreadlog;
  selectedAttestationThreadlogId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editFormAttestationActions = this.formBuilder.group({
      deviceBlock: [''],
      transactionBlock: [''],
      pinBlock: [''],
      manualBlock: [''],
      orBlock: [''],
      nfcBlock: [''],
      noBlock: [''],
    });

    this.editFormAttestationThreads = this.formBuilder.group({
      debug: [''],
      emulation: [''],
      root: [''],
      channeling: [''],
      geoPosition: [''],
      velocity: [''],
    });

    this.editFormAttestationThreadlogs = this.formBuilder.group({
      id: [''],
      debug: [''],
      emulation: [''],
      root: [''],
      channeling: [''],
      geoPosition: [''],
      velocity: [''],
      status: [''],
    });

    /**
     * DEV. Profile
     */
    this.allAttestationActions = this.dataService.getAllAttestationActions();
    this.takeChoices = this.dataService.getTakeChoices();
    this.statusChoices = this.dataService.getStatusChoices();

    this.attestationActions = this.dataService.getAttestationActions();
    this.editFormAttestationActions.setValue(this.attestationActions[0]);

    this.attestationThreads = this.dataService.getAttestationThreads();
    this.editFormAttestationThreads.setValue(this.attestationThreads[0]);

    this.attestationThreadlogs = this.dataService.findAllAttestationThreadlogs().content;

    /**
     * PROD. Profile
     */
  }

  public createAttestationThreadlog() {
    this.selectedAttestationThreadlog = {
      'id': null,
      'debug': null,
      'emulation': null,
      'root': null,
      'channeling': null,
      'geoPosition': null,
      'velocity': null,
      'status': null
    };
    this.selectedAttestationThreadlogId = null;
    this.editFormAttestationThreadlogs.setValue(this.selectedAttestationThreadlog);
  }

  public selectAttestationThreadlog(attestationThreadlog) {
    console.log(attestationThreadlog);
    this.selectedAttestationThreadlog = attestationThreadlog;
    this.editFormAttestationThreadlogs.setValue(attestationThreadlog);
  }

  public selectAttestationThreadlogId(attestationThreadlog) {
    if (this.selectedAttestationThreadlogId === attestationThreadlog.id) {
      this.selectAttestationThreadlog(attestationThreadlog);
    } else {
      this.selectedAttestationThreadlogId = attestationThreadlog.id;
    }
  }

  public closeAttestationThreadlog() {
    this.selectedAttestationThreadlog = null;
  }

  public onSubmit() {
    const entity = this.editFormAttestationThreadlogs.value;
    if (entity.id === null) {
      // this.apiService.createReceiptTemplate(dto)
      // .pipe(first())
      // .subscribe(
      //   data => {
      //   this.selectedReceiptTemplate = dto;
      //   this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(dto);
      //   this.selectedReceiptTemplate.respTxt = this.getRespTxt(dto);
      //   // const entity: any = dtoToReceiptTemplate(dto);
      //   this.editForm.setValue(entity);
      //   this.pageRefresh(); // created successfully.
      // },
      // error => {
      //   // alert( JSON.stringify(error) );
      //   this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      // });
    } else {
      // this.apiService.updateReceiptTemplate(dto)
      // .pipe(first())
      // .subscribe(
      //   data => {
      //   this.selectedReceiptTemplate = dto;
      //   this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(dto);
      //   this.selectedReceiptTemplate.respTxt = this.getRespTxt(dto);
      //   // const entity: any = dtoToReceiptTemplate(dto);
      //   this.editForm.setValue(entity);
      //   this.pageRefresh(); // updated successfully.
      // },
      // error => {
      //   // alert( JSON.stringify(error) );
      //   this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      // });
    }
  }

  public pageRefresh() {
    // location.reload();
  }
}
