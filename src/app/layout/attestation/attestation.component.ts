import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToAttestationActions, dtoToAttestationThreads, dtoToAttestationThreatSequence } from '../../core/model/attestation.model';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css']
})
export class AttestationComponent implements OnInit {
 attestationThreadlogs = [];
  takeChoices;
  symbolChoices;
  statusChoices;
  allAttestationActions;
  editFormAttestationActions: FormGroup;
  editFormAttestationThreads: FormGroup;
  editFormAttestationThreadlogs: FormGroup;
  selectedAttestationThreadlog;
  selectedAttestationThreadlogId;
  allAttestationActionNames = [];
  attestationActionNamesSettings = {};

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
      qrBlock: [''],
      nfcBlock: [''],
      noBlock: [''],
    });

    this.editFormAttestationThreads = this.formBuilder.group({
      debug: [''],
      emulator: [''],
      root: [''],
      channelIntegrity: [''],
      geoPosition: [''],
      velocity: [''],
      integrity: [''],
    });

    this.editFormAttestationThreadlogs = this.formBuilder.group({
      id: [''],
      debug: [''],
      emulator: [''],
      root: [''],
      channelIntegrity: [''],
      geoPosition: [''],
      velocity: [''],
      attestationActions: [''],
      attestationActionNames: [''],
      enabled: [''],
      color: [''],
      integrity: [''],
    });

    /**
     * DEV. Profile
     */
    this.attestationActionNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };
    this.allAttestationActionNames = this.dataService.getAllAttestationActionNames();

    this.allAttestationActions = this.dataService.getAllAttestationActions();
    this.takeChoices = this.dataService.getTakeChoices();
    this.symbolChoices = this.dataService.getSymbolChoices();
    this.statusChoices = this.dataService.getStatusChoices();

    // this.attestationActions = this.dataService.getAttestationActions();
    // this.editFormAttestationActions.setValue(this.attestationActions[0]);

    // this.attestationThreads = this.dataService.getAttestationThreads();
    // this.editFormAttestationThreads.setValue(this.attestationThreads[0]);

    // this.attestationThreadlogs = this.dataService.findAllAttestationThreadlogs().content;
    // for (let i = 0; i < this.attestationThreadlogs.length; i++) {
    //   var attestationActionNames: string = this.attestationThreadlogs[i].attestationActions.toString();
    //   this.attestationThreadlogs[i].attestationActionNames = attestationActionNames.length<30 ? attestationActionNames : attestationActionNames.substring(0, 25) + '...';
    //   this.attestationThreadlogs[i].color = this.attestationThreadlogs[i].status==='enabled' ? '#006600' : '#AAAAAA';
    // }

    /**
     * PROD. Profile
     */
    this.apiService.findAllAttestationActions()
      .subscribe( data => {
          console.log(data)
          var entity: any = dtoToAttestationActions(data);
          this.editFormAttestationActions.setValue(entity);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllAttestationThreats()
      .subscribe( data => {
          console.log(data)
          var entity: any = dtoToAttestationThreads(data);
          this.editFormAttestationThreads.setValue(entity);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.apiService.findAllAttestationThreatSequences()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            this.attestationThreadlogs.push(dtoToAttestationThreatSequence(data.content[i]));
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  public createAttestationThreadlog() {
    this.selectedAttestationThreadlog = {
      'id': null,
      'debug': null,
      'emulator': null,
      'root': null,
      'integrity': null,
      'channelIntegrity': null,
      'geoPosition': null,
      'velocity': null,
      'attestationActions': null,
      'attestationActionNames': null,
      'enabled': null,
      'color': null
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

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
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
