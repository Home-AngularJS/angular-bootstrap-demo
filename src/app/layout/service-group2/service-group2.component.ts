import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { bankToDto, dtoToBank } from '../../core/model/bank.model';

@Component({
  selector: 'app-service-group2',
  templateUrl: './service-group2.component.html',
  styleUrls: ['./service-group2.component.css']
})
export class ServiceGroup2Component implements OnInit {
  allAllowedLanguages = [];
  allowedLanguagesSettings = {};
  takeChoices: any;
  idMpsCards;
  products;
  productNames: any = [];
  productNamesSettings = {};

  serviceGroups: any = [];
  selectedServiceGroup;
  selectedServiceGroupNumber;
  editForm: FormGroup;
  @ViewChild('servicegroup') servicegroup: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalServiceGroup: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      email: [''],
      phone: [''],
      taxId: [''],
      mfo: [''],
      instructions: [''],
    });

    /**
     * DEV. Profile
     */

    /**
     * PROD. Profile
     */
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) {
            this.serviceGroups.push(dtoToBank(data.content[i]));
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  public selectServiceGroup(serviceGroup) {
    console.log(serviceGroup);
    this.selectedServiceGroup = serviceGroup;
    if (serviceGroup != null) {
      this.editForm.setValue(serviceGroup);
      this.openServiceGroup();
    }
  }

  public selectServiceGroupNumber(serviceGroup) {
    if (this.selectedServiceGroupNumber === serviceGroup.id) {
      this.selectServiceGroup(serviceGroup);
    } else {
      this.selectedServiceGroupNumber = serviceGroup.id;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
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

  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  public openServiceGroup: EmitType<object> = () => {
    document.getElementById('servicegroup').style.display = 'block';
    this.isModalServiceGroup = true;
    this.servicegroup.show();
  }

  public onServiceGroup: EmitType<object> = () => {
    // save or update:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.editForm.value;
      console.log(entity)

      if (entity.id === null) {
        const entityUpdate: any = bankToDto(entity)
        this.apiService.createBank(entityUpdate)
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Создать', 'Группу Терминалов');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Создать', 'Группу Терминалов');
            });
      } else {
        this.apiService.updateBank(entity.id, bankToDto(entity))
          .pipe(first())
          .subscribe(
            data => {
              this.servicegroup.hide();
              this.showSuccess('Сохранить', 'Группу Терминалов');
              this.pageRefresh(); // updated successfully.
            },
            error => {
              this.showError('Сохранить', 'Группу Терминалов');
            });
      }
    };

    // cancel:
    document.getElementById('btnCancel').onclick = (): void => {
      this.servicegroup.hide();
    };
  }

  public offServiceGroup: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public pageRefresh() {
    this.apiService.findAllBanks()
      .subscribe( data => {
          console.log(data)
          this.serviceGroups = [];
          for (let i = 0; i < data.content.length; i++) this.serviceGroups.push(dtoToBank(data.content[i]));
          this.showSuccess('Обновить', 'Группы Терминалов');
        },
        error => {
          this.showError('Обновить', 'Группы Терминалов');
        });
  }
}
