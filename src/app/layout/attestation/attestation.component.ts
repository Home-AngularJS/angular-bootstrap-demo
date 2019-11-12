import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { multiselectToEntity } from '../../core/model/receipt-send-channel.model';
import {
  attestationActionsToUpdate, attestationThreadsToUpdate,
  attestationThreatSequenceNew,
  nameToAttestationActionKeys,
  dtoToAttestationActions,
  nameToAttestationThreadKeys,
  dtoToAttestationThreads,
  dtoToAttestationThreatSequence, valuesToAttestationActionKeys, updateAttestationThreatSequence
} from '../../core/model/attestation.model';

@Component({
  selector: 'app-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.css']
})
export class AttestationComponent implements OnInit {
 attestationThreadlogs = [];
  takeChoices;
  symbolChoices;
  allAttestationActions;
  allAttestationThreads;
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
    this.allAttestationThreads = this.dataService.getAllAttestationThreads();
    this.takeChoices = this.dataService.getTakeChoices();
    this.symbolChoices = this.dataService.getSymbolChoices();

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
          this.attestationThreadlogs = [];
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
    this.selectedAttestationThreadlog = attestationThreatSequenceNew();
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


  private updateAttestationAction(id: any, value: any) {
    this.apiService.updateAttestationAction(id, value)
      .pipe(first())
      .subscribe(
        data => {
          this.attestationActionsRefresh(); // updated successfully.
        },
        error => {
          alert(JSON.stringify(error));
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  private updateAttestationThreat(id: any, value: any) {
    this.apiService.updateAttestationThreat(id, value)
      .pipe(first())
      .subscribe(
        data => {
          this.attestationThreatsRefresh(); // updated successfully.
        },
        error => {
          alert(JSON.stringify(error));
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }

  public onSubmitAttestationActions() {
    const entity = this.editFormAttestationActions.value;
    console.log(entity)
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'deviceBlock'), attestationActionsToUpdate(entity.deviceBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'manualBlock'), attestationActionsToUpdate(entity.manualBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'nfcBlock'), attestationActionsToUpdate(entity.nfcBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'noBlock'), attestationActionsToUpdate(entity.noBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'pinBlock'), attestationActionsToUpdate(entity.pinBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'qrBlock'), attestationActionsToUpdate(entity.qrBlock));
    this.updateAttestationAction(nameToAttestationActionKeys(this.allAttestationActions, 'transactionBlock'), attestationActionsToUpdate(entity.transactionBlock));
  }

  public onSubmitAttestationThreads() {
    const entity = this.editFormAttestationThreads.value;
    console.log(entity)
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'channelIntegrity'), attestationThreadsToUpdate(entity.channelIntegrity));
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'debug'), attestationThreadsToUpdate(entity.debug));
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'emulator'), attestationThreadsToUpdate(entity.emulator));
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'geoPosition'), attestationThreadsToUpdate(entity.geoPosition));
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'root'), attestationThreadsToUpdate(entity.root));
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'velocity'), attestationThreadsToUpdate(entity.velocity));
    // this.updateAttestationThreat(dtoToAttestationThreadKeys(this.allAttestationThreads, 'integrity'), attestationThreadsToUpdate(entity.integrity));
  }

  public onSubmit() {
    const entity = this.editFormAttestationThreadlogs.value;
    console.log(entity)
    multiselectToEntity(entity.attestationActions);

    if (entity.id === null) {
      const entityUpdate: any = updateAttestationThreatSequence(entity)
      entityUpdate.integrity = 'N'; //TODO: ?
      this.apiService.createAttestationThreatSequence(entityUpdate)
        .pipe(first())
        .subscribe(
          data => {
            this.attestationThreatSequencesRefresh(); // updated successfully.
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    } else {
      this.apiService.updateAttestationThreatSequence(entity.id, updateAttestationThreatSequence(entity))
      .pipe(first())
      .subscribe(
        data => {
        this.attestationThreatSequencesRefresh(); // updated successfully.
      },
      error => {
        alert( JSON.stringify(error) );
        // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      });
    }
  }

  public pageRefresh() {
    // location.reload();
    this.attestationActionsRefresh();
    this.attestationThreatsRefresh();
    this.attestationThreatSequencesRefresh();
  }

  private attestationActionsRefresh() {
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
  }

  private attestationThreatsRefresh() {
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
  }

  private attestationThreatSequencesRefresh() {
    this.apiService.findAllAttestationThreatSequences()
      .subscribe( data => {
          console.log(data)
          this.attestationThreadlogs = [];
          for (let i = 0; i < data.content.length; i++) {
            this.attestationThreadlogs.push(dtoToAttestationThreatSequence(data.content[i]));
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
