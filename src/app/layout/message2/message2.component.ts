import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { dtoToTerminalMessage, dtoToMerchantMessage, MessageAction, messageToUpdate } from '../../core/model/message2.model';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message2',
  templateUrl: './message2.component.html',
  styleUrls: ['./message2.component.css']
})
export class Message2Component implements OnInit {

  terminals: any = [];
  merchants: any = [];
  editFormTerminal: FormGroup;
  editFormMerchant: FormGroup;
  // selectedUserRole;
  // selectedUserRoleCode;
  terminalMenu = [
    {'messageItemName': 'terminalMenuNotify', 'checked': false}
  ]
  merchantMenu = [
    {'messageItemName': 'merchantMenuNotify', 'checked': false}
  ]

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) {}

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editFormTerminal = this.formBuilder.group({
      terminalId: [''],
      text: [''],
      notifyAction: ['']
    });

    this.editFormMerchant = this.formBuilder.group({
      merchantId: [''],
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
            terminals.push(dtoToTerminalMessage(data.content[i]));
          }
          this.terminals = terminals;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllMerchants()
      .subscribe( data => {
          console.log(data)
          const merchants = [];
          for (let i = 0; i < data.content.length; i++) {
            merchants.push(dtoToMerchantMessage(data.content[i]));
          }
          this.merchants = merchants;
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
  //   this.editFormTerminal.setValue(userRole);
  //
  //   for (var m = 0; m < this.horizontalMenu.length; m++) this.isCheckedTerminalList(this.horizontalMenu[m].messageItemName)
  //   for (var m = 0; m < this.verticalMenu.length; m++) this.isCheckedTerminalList(this.verticalMenu[m].messageItemName)
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
    if (selectedMessageItem.notifyAction[messageItemName].value[0].messageName === action.value.messageName) selectedMessageItem.notifyAction[messageItemName].value[0].checked = item.target.checked
    if (this.terminalMenu[0].messageItemName === item.target.name) this.isCheckedTerminalList(item.target.name)
    if (this.merchantMenu[0].messageItemName === item.target.name) this.isCheckedMerchantList(item.target.name)
  }

  public isCheckedTerminalList(messageItemName: string) {
    const inputs = document.getElementsByName(messageItemName)
    let SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id')
      for (var s = 0; s < this.terminals.length; s++) {
        if (this.terminals[s].notifyAction[messageActionName].value[0].message == message) {
          if (this.terminals[s].notifyAction[messageActionName].value[0].checked) SELECT_INPUTS++
        }
      }
    }

    const ALL_INPUTS = inputs.length
    for (var m = 0; m < this.terminalMenu.length; m++) {
      if (this.terminalMenu[m].messageItemName == messageItemName) {
        if (0 < ALL_INPUTS && ALL_INPUTS == SELECT_INPUTS) this.terminalMenu[m].checked = true
        else this.terminalMenu[m].checked = false
      }
    }
  }

  public isCheckedMerchantList(messageItemName: string) {
    const inputs = document.getElementsByName(messageItemName)
    let SELECT_INPUTS = 0
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id')
      for (var s = 0; s < this.merchants.length; s++) {
        if (this.merchants[s].notifyAction[messageActionName].value[0].message == message) {
          if (this.merchants[s].notifyAction[messageActionName].value[0].checked) SELECT_INPUTS++
        }
      }
    }

    const ALL_INPUTS = inputs.length
    for (var m = 0; m < this.merchantMenu.length; m++) {
      if (this.merchantMenu[m].messageItemName == messageItemName) {
        if (0 < ALL_INPUTS && ALL_INPUTS == SELECT_INPUTS) this.merchantMenu[m].checked = true
        else this.merchantMenu[m].checked = false
      }
    }
  }

  /**
   * Альтернатива
   * @see https://stackblitz.com/edit/angular-check-uncheck-all-checkboxes
   * @see https://www.freakyjolly.com/check-all-uncheck-all-checkbox-list-in-angular-io-version-2
   *      https://freakyjolly.com/demo/Angular/Angular7/NG7CheckBox
   */
  public onCheckedTerminaList(messageItemName: string, item: any) {
    const inputs = document.getElementsByName(messageItemName)
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id') // const message = inputs[i].id
      for (var s = 0; s < this.terminals.length; s++) {
        if (this.terminals[s].notifyAction[messageActionName].value[0].message == message) this.terminals[s].notifyAction[messageActionName].value[0].checked = item.target.checked
      }
    }
  }

  public onCheckedMerchantList(messageItemName: string, item: any) {
    const inputs = document.getElementsByName(messageItemName)
    for (var i = 0; i < inputs.length; i++) {
      const messageActionName = inputs[i].getAttribute('value')
      const message = inputs[i].getAttribute('id') // const message = inputs[i].id
      for (var s = 0; s < this.merchants.length; s++) {
        if (this.merchants[s].notifyAction[messageActionName].value[0].message == message) this.merchants[s].notifyAction[messageActionName].value[0].checked = item.target.checked
      }
    }
  }

  public onSubmit() {
    // const userRole = this.editFormTerminal.value;
    // const dto = userRoleToUpdate(userRole);
    //
    // this.apiService.updateRole(userRole.roleCode, dto)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.showSuccess(userRole.roleCode, 'Сохранить');
    //       this.editFormTerminal.setValue(userRole);
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
