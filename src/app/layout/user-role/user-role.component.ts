import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { dtoToUserRole, userRoleToUpdate } from '../../core/model/user-role.model';
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
  // musicForm: FormGroup;
  selectedUserRole;
  selectedUserRoleCode;
  allUserAuthorities = [];
  userAuthoritiesSettings = {};
  /**
   * @see https://stackblitz.com/edit/angular-ghgppz
   */
  // musicPreferences = [
  //   { id: 1, genre: 'Pop' },
  //   { id: 2, genre: 'Rock' },
  //   { id: 3, genre: 'Techno' },
  //   { id: 4, genre: 'Hiphop' }
  // ];

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) {
    // // Create a FormControl for each available music preference, initialize them as unchecked, and put them in an array
    // const formControls = this.musicPreferences.map(control => new FormControl(false));
    //
    // // Create a FormControl for the select/unselect all checkbox
    // const selectAllControl = new FormControl(false);
    //
    // // Simply add the list of FormControls to the FormGroup as a FormArray, add the selectAllControl separetely
    // this.musicForm = this.formBuilder.group({
    //   musicPreferences: new FormArray(formControls),
    //   selectAll: selectAllControl
    // });
  }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.userAuthoritiesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.editForm = this.formBuilder.group({
      roleCode: [''],
      description: [''],
      roleAuthorities: [''],
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllUserAuthorities()
      .subscribe( data => {
          console.log(data)
          const allUserAuthorities: any = [];
          for (let i = 0; i < data.length; i++) {
            allUserAuthorities.push(data[i].authority);
          }
          this.allUserAuthorities = allUserAuthorities;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllUserRoles()
      .subscribe( data => {
          console.log(data)
          const userRoles: any = [];
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

  // onChanges(): void {
  //   // Subscribe to changes on the selectAll checkbox
  //   this.musicForm.get('selectAll').valueChanges.subscribe(bool => {
  //     this.musicForm
  //       .get('musicPreferences')
  //       .patchValue(Array(this.musicPreferences.length).fill(bool), { emitEvent: false });
  //   });
  //
  //   // Subscribe to changes on the music preference checkboxes
  //   this.musicForm.get('musicPreferences').valueChanges.subscribe(val => {
  //     const allSelected = val.every(bool => bool);
  //     if (this.musicForm.get('selectAll').value !== allSelected) {
  //       this.musicForm.get('selectAll').patchValue(allSelected, { emitEvent: false });
  //     }
  //   });
  // }

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
          // this.closeProduct();
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
    this.apiService.findAllUserAuthorities()
      .subscribe( data => {
          this.allUserAuthorities = [];
          console.log(data)
          const allUserAuthorities: any = [];
          for (let i = 0; i < data.length; i++) allUserAuthorities.push(data[i].authority);
          this.allUserAuthorities = allUserAuthorities;
          this.showSuccess('Привилегии', 'Обновить');
        },
        error => {
          // alert( JSON.stringify(error) );
          this.showError('Привилегии', 'Обновить');
        });

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
