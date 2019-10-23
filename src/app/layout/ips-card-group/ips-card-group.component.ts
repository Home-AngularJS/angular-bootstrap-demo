import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToIpsCardGroup, ipsCardGroupNew, ipsCardGroupToCreate } from '../../core/model/ips-card-group.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-ips-card-group',
  templateUrl: './ips-card-group.component.html',
  styleUrls: ['./ips-card-group.component.css']
})
export class IpsCardGroupComponent implements OnInit {

  ipsCardGroups: any = [];
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
      ipsCardGroupId: [''],
      ipsName: [''],
      ipsSymbol: [''],
      firstCardNum: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            const ipsCardGroup: any = data.content[i];
            var entity: any = dtoToIpsCardGroup(ipsCardGroup);
            this.ipsCardGroups.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
    // this.ipsCardGroups = this.dataService.findAllIpsCardGroups();
  }

  public createIpsCardGroup() {
    const ipsCardGroup: any = ipsCardGroupNew();
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
    if (this.selectedIpsCardGroupId === ipsCardGroup.ipsCardGroupId) {
      this.selectIpsCardGroup(ipsCardGroup);
    } else {
      this.selectedIpsCardGroupId = ipsCardGroup.ipsCardGroupId;
    }
  }

  public closeIpsCardGroup() {
    this.selectedIpsCardGroup = null;
  }

  public onSubmit() {
    const dto = ipsCardGroupToCreate(this.editForm.value);

    this.apiService.createIpsCardGroup(dto)
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
    this.apiService.findAllIpsCardGroups()
      .subscribe( data => {
          console.log(data)
          this.ipsCardGroups = [];
          for (let i = 0; i < data.content.length; i++) {
            const ipsCardGroup: any = data.content[i];
            var entity: any = dtoToIpsCardGroup(ipsCardGroup);
            this.ipsCardGroups.push(entity);
          }
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
