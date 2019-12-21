import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dtoToIpsCardGroup, ipsCardGroupNew, ipsCardGroupToCreate } from '../../core/model/ips-card-group.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  takeChoices: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      ipsCardGroupId: [''],
      ipsName: [''],
      ipsSymbol: [''],
      firstCardNum: [''],
      noPinLimit: [''],
      pin: ['']
    });

    this.takeChoices = this.dataService.getTakeChoices();

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
          // alert( JSON.stringify(error) );
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
          this.showSuccess('Платежные системы', 'Создать');
          // this.closeMerchant();
          this.pageRefresh(); // updated successfully.
        },
        error => {
          this.showError('Платежные системы', 'Создать');
        });
  }

  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread
   */
  showSuccess(title, message) {
    this.toastr.success(message, title, {
      timeOut: 2000
    });
  }

  showError(title, message) {
    this.toastr.error(message, title, {
      timeOut: 20000
    });
  }

  showWarning(title, message) {
    this.toastr.warning(message, title, {
      timeOut: 2000
    });
  }

  showInfo(title, message) {
    this.toastr.info(message, title, {
      timeOut: 2000
    });
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
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
          this.showSuccess('Платежные системы', 'Обновить');
        },
        error => {
          this.showError('Платежные системы', 'Обновить');
        });
  }
}
