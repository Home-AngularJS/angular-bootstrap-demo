import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ips-card-group',
  templateUrl: './ips-card-group.component.html',
  styleUrls: ['./ips-card-group.component.css']
})
export class IpsCardGroupComponent implements OnInit {

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
