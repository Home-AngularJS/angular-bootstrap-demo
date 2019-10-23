import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {dtoToAttestationActions} from '../../core/model/attestation.model';

@Component({
  selector: 'app-attestation-history',
  templateUrl: './attestation-history.component.html',
  styleUrls: ['./attestation-history.component.css']
})
export class AttestationHistoryComponent implements OnInit {

  ipsCardGroups;
  editForm: FormGroup;
  selectedIpsCardGroup;
  selectedIpsCardGroupId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      mpsId: [''],
      mpsName: [''],
      firsNumber: [''],
      symbol: [''],
      limit: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllAttestations()
      .subscribe( data => {
          console.log(data)
          // var entity: any = dtoToAttestationActions(data);
          // this.editFormAttestationActions.setValue(entity);
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
    this.ipsCardGroups = this.dataService.findAllIpsCardGroups();
  }

  public createIpsCardGroup() {
    const ipsCardGroup: any = {
      'mpsId': null,
      'mpsName': null,
      'firsNumber': null,
      'symbol': null,
      'limit': 0
    };
    console.log(ipsCardGroup)
    this.selectedIpsCardGroup = ipsCardGroup;
    this.editForm.setValue(ipsCardGroup);
  }

  public selectIpsCardGroup(ipsCardGroup) {
    console.log(ipsCardGroup);
    this.selectedIpsCardGroup = ipsCardGroup;
    this.editForm.setValue(ipsCardGroup);
  }

  public selectIpsCardGroupId(ipsCardGroup) {
    if (this.selectedIpsCardGroupId === ipsCardGroup.mpsId) {
      this.selectIpsCardGroup(ipsCardGroup);
    } else {
      this.selectedIpsCardGroupId = ipsCardGroup.mpsId;
    }
  }

  public closeIpsCardGroup() {
    this.selectedIpsCardGroup = null;
  }

  public onSubmit() {
    const ipsCardGroup = this.editForm.value;


    if (ipsCardGroup.mpsId === null) {
      this.dataService.createIpsCardGroup(ipsCardGroup);
      // this.pageRefresh(); // created successfully.
      // this.closeIpsCardGroup();
    } else {
      this.dataService.updateIpsCardGroup(ipsCardGroup);
      // this.pageRefresh(); // updated successfully.
      // this.closeIpsCardGroup();
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
