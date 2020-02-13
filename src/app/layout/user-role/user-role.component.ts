import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { dtoToUserRole, UserRoleModel, userRoleToUpdate } from '../../core/model/user-role.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css']
})
export class UserRoleComponent implements OnInit {

  userRoles;
  editForm: FormGroup;
  selectedUserRole;
  selectedUserRoleCode;
  // allUserAuthorities = [];
  // userAuthoritiesSettings = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    // this.userAuthoritiesSettings = {
    //   itemsShowLimit: 1,
    //   noDataAvailablePlaceholderText: 'нет данных',
    //   selectAllText: 'Выбрать все',
    //   unSelectAllText: 'Игнорировать все',
    // };

    this.editForm = this.formBuilder.group({
      roleCode: [''],
      description: [''],
      roleAuthorities: [''],
      groupGrants: [''],

      paymentSystemsView: [''],
      paymentSystemsEdit: [''],
      paymentSystemsCreate: [''],
      systemKeysView: [''],
      systemKeysEdit: [''],
      systemKeysCreate: [''],
      paymentSystemKeysView: [''],
      paymentSystemKeysEdit: [''],
      paymentSystemKeysCreate: [''],
      generalSettingsView: [''],
      generalSettingsEdit: [''],
      generalSettingsCreate: [''],
      attestationParametersView: [''],
      attestationParametersEdit: [''],
      attestationParametersCreate: [''],
      merchantView: [''],
      merchantEdit: [''],
      merchantCreate: [''],
      terminalView: [''],
      terminalEdit: [''],
      terminalCreate: [''],
      terminalGroupsView: [''],
      terminalGroupsEdit: [''],
      terminalGroups: [''],
      productsView: [''],
      productsEdit: [''],
      productsCreate: [''],
      receiptTemplateView: [''],
      receiptTemplateEdit: [''],
      receiptTemplateCreate: [''],
      terminalKeysView: [''],
      terminalKeysEdit: [''],
      terminalKeysCreate: [''],
      scheduleView: [''],
      scheduleEdit: [''],
      scheduleCreate: [''],
      transactionsView: [''],
      transactionsEdit: [''],
      transactionsCreate: [''],
      applicationLanguagesView: [''],
      applicationLanguagesEdit: [''],
      applicationLanguagesCreate: [''],
      attestationHistoryView: [''],
      attestationHistoryEdit: [''],
      attestationHistoryCreate: [''],
      receiptRequestsView: [''],
      receiptRequestsEdit: [''],
      receiptRequestsCreate: [''],
      analyticsView: [''],
      analyticsEdit: [''],
      analyticsCreate: [''],
      monitoringView: [''],
      monitoringEdit: [''],
      monitoringCreate: [''],
      createUserView: [''],
      createUserEdit: [''],
      createUserCreate: [''],
    });

    /**
     * PROD. Profile
     */
    // this.apiService.findAllUserAuthorities()
    //   .subscribe( data => {
    //       console.log(data)
    //       const allUserAuthorities: any = [];
    //       for (let i = 0; i < data.length; i++) {
    //         allUserAuthorities.push(data[i].authority);
    //       }
    //       this.allUserAuthorities = allUserAuthorities;
    //     },
    //     error => {
    //       // alert( JSON.stringify(error) );
    //     });

    this.apiService.findAllUserRoles()
      .subscribe( data => {
          console.log(data)
          const userRoles: Array<UserRoleModel> = [];
          for (let i = 0; i < data.length; i++) {
            userRoles.push(dtoToUserRole(data[i]));
          }
          this.userRoles = userRoles;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public selectUserRole(userRole) {
    console.log(userRole);
    this.selectedUserRole = userRole;
    this.editForm.setValue(userRole);
  }

  public selectUserRoleCode(userRole) {
    if (this.selectedUserRoleCode === userRole.roleCode) {
      this.selectUserRole(userRole);
    } else {
      this.selectedUserRoleCode = userRole.roleCode;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  public closeUserRole() {
    this.selectedUserRole = null;
  }

  public onSubmit() {
    const userRole = this.editForm.value;
    console.log(userRole)


    // const createUserView = document.getElementById('createUserView')
    // console.log('createUserView = ' + JSON.stringify(createUserView));
    // const createUserEdit = document.getElementById('createUserEdit')
    // console.log('createUserEdit = ' + JSON.stringify(createUserEdit));
    // const createUserCreate = document.getElementById('createUserCreate')
    // console.log('createUserCreate = ' + JSON.stringify(createUserCreate));
    // const createUser = document.getElementsByName('createUser');
    // console.log('createUser = ' + JSON.stringify(createUser));
    // console.log('createUser = ' + createUser[0].nodeValue);
    // console.log('createUser = ' + createUser[1].nodeValue);
    // console.log('createUser = ' + createUser[2].nodeValue);

    const dto = userRoleToUpdate(userRole);

    this.apiService.updateRole(userRole.roleCode, dto)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess(userRole.roleCode, 'Сохранить');
          this.editForm.setValue(userRole);
          this.pageRefresh(); // updated successfully.
        },
        error => {
          this.showError(userRole.roleCode, 'Сохранить');
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
    // this.apiService.findAllUserAuthorities()
    //   .subscribe( data => {
    //       this.allUserAuthorities = [];
    //       console.log(data)
    //       const allUserAuthorities: any = [];
    //       for (let i = 0; i < data.length; i++) allUserAuthorities.push(data[i].authority);
    //       this.allUserAuthorities = allUserAuthorities;
    //       this.showSuccess('Привилегии', 'Обновить');
    //     },
    //     error => {
    //       // alert( JSON.stringify(error) );
    //       this.showError('Привилегии', 'Обновить');
    //     });

    this.apiService.findAllUserRoles()
      .subscribe( data => {
          this.userRoles = [];
          console.log(data)
          const userRoles: any = [];
          for (let i = 0; i < data.length; i++) userRoles.push(dtoToUserRole(data[i]));
          this.userRoles = userRoles;
          this.showSuccess('Роли', 'Обновить');
        },
        error => {
          // alert( JSON.stringify(error) );
          this.showError('Роли', 'Обновить');
        });
  }
}
