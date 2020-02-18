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

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      roleCode: [''],
      description: [''],
      roleAuthorities: ['']
    });

    /**
     * PROD. Profile
     */
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

  public onCheckedItem(groupGrantName: string, grant: any, item: any) {
    for (let i = 0; i < this.selectedUserRole.roleAuthorities[groupGrantName].value.length; i++) {
      if (this.selectedUserRole.roleAuthorities[groupGrantName].value[i].grantName === grant.value.grantName) this.selectedUserRole.roleAuthorities[groupGrantName].value[i].checked = item.target.checked
    }
  }

  /**
   * Альтернатива
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public onCheckedItemList(groupItemName: string, item: any) {
    const inputs = document.getElementsByName(groupItemName);
    for (var i = 0; i < inputs.length; i++) {
      const groupGrantName = inputs[i].getAttribute('value')
      const authority = inputs[i].getAttribute('id') // const authority = inputs[i].id
      for (var s = 0; s < this.selectedUserRole.roleAuthorities[groupGrantName].value.length; s++) {
        if (this.selectedUserRole.roleAuthorities[groupGrantName].value[s].authority == authority) this.selectedUserRole.roleAuthorities[groupGrantName].value[s].checked = item.target.checked
      }
    }
  }

  public closeUserRole() {
    this.selectedUserRole = null;
  }

  public onSubmit() {
    const userRole = this.editForm.value;
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
