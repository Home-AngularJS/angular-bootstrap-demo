import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { dtoToMessage, MessageGrant, messageToUpdate } from '../../core/model/message2.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message2',
  templateUrl: './message2.component.html',
  styleUrls: ['./message2.component.css']
})
export class Message2Component implements OnInit {

  terminals: any = [];
  editForm: FormGroup;
  // selectedUserRole;
  // selectedUserRoleCode;
  terminalMenu = [
    {'groupItemName': 'terminalMenuNotify', 'checked': false}
  ]

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      terminalId: [''],
      text: [''],
      notifyAction: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllTerminals()
      .subscribe( data => {
          console.log(data)
          const terminals = [];
          for (let i = 0; i < data.content.length; i++) {
            terminals.push(dtoToMessage(data.content[i]));
          }
          this.terminals = terminals;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  // public selectUserRole(userRole) {
  //   console.log(userRole);
  //   this.selectedUserRole = userRole;
  //   this.editForm.setValue(userRole);
  //
  //   for (var m = 0; m < this.horizontalMenu.length; m++) this.isCheckedItemList(this.horizontalMenu[m].groupItemName)
  //   for (var m = 0; m < this.verticalMenu.length; m++) this.isCheckedItemList(this.verticalMenu[m].groupItemName)
  // }
  //
  // public selectUserRoleCode(userRole) {
  //   if (this.selectedUserRoleCode === userRole.roleCode) {
  //     this.selectUserRole(userRole);
  //   } else {
  //     this.selectedUserRoleCode = userRole.roleCode;
  //   }
  // }

  public onCheckedItem(selectedMessageItem: any, messageItemName: string, action: any, item: any) {
    if (selectedMessageItem.notifyAction[messageItemName].value[0].grantName === action.value.grantName) selectedMessageItem.notifyAction[messageItemName].value[0].checked = item.target.checked
    this.isCheckedItemList(item.target.name)
  }

  public isCheckedItemList(messageItemName: string) {
    const inputs = document.getElementsByName(messageItemName)
    let SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const groupGrantName = inputs[i].getAttribute('value')
      const authority = inputs[i].getAttribute('id')
      for (var s = 0; s < this.terminals.length; s++) {
        if (this.terminals[s].notifyAction[groupGrantName].value[0].authority == authority) {
          if (this.terminals[s].notifyAction[groupGrantName].value[0].checked) SELECT_INPUTS++
        }
      }
    }

    const ALL_INPUTS = inputs.length
    for (var m = 0; m < this.terminalMenu.length; m++) {
      if (this.terminalMenu[m].groupItemName == messageItemName) {
        if (0 < ALL_INPUTS && ALL_INPUTS == SELECT_INPUTS) this.terminalMenu[m].checked = true
        else this.terminalMenu[m].checked = false
      }
    }
  }

  /**
   * Альтернатива
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public onCheckedItemList(groupItemName: string, item: any) {
    const inputs = document.getElementsByName(groupItemName)
    for (var i = 0; i < inputs.length; i++) {
      const groupGrantName = inputs[i].getAttribute('value')
      const authority = inputs[i].getAttribute('id') // const authority = inputs[i].id
      for (var s = 0; s < this.terminals.length; s++) {
        if (this.terminals[s].notifyAction[groupGrantName].value[0].authority == authority) this.terminals[s].notifyAction[groupGrantName].value[0].checked = item.target.checked
      }
    }
  }

  public onSubmit() {
    // const userRole = this.editForm.value;
    // const dto = userRoleToUpdate(userRole);
    //
    // this.apiService.updateRole(userRole.roleCode, dto)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.showSuccess(userRole.roleCode, 'Сохранить');
    //       this.editForm.setValue(userRole);
    //       this.pageRefresh(); // updated successfully.
    //     },
    //     error => {
    //       this.showError(userRole.roleCode, 'Сохранить');
    //     });
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
    // this.apiService.findAllUserRoles()
    //   .subscribe( data => {
    //       this.userRoles = [];
    //       console.log(data)
    //       const userRoles: any = [];
    //       for (let i = 0; i < data.length; i++) userRoles.push(dtoToUserRole(data[i]));
    //       this.userRoles = userRoles;
    //       this.showSuccess('Уведомления', 'Обновить');
    //     },
    //     error => {
          // alert( JSON.stringify(error) );
          this.showError('Уведомления', 'Обновить');
    //     });
  }
}
