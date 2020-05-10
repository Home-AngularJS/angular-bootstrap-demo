import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTmsKey, tmsKeyNew, tmsKeyToDto } from '../../core/model/tms-key.model';
import { UserGrant, UserGrantPermission } from '../../core/model/user-role.model';

@Component({
  selector: 'app-tms-key',
  templateUrl: './tms-key.component.html',
  styleUrls: ['./tms-key.component.css']
})
export class TmsKeyComponent implements OnInit {

  tmsKeys;
  editForm: FormGroup;
  selectedTmsKey;
  selectedTmsKeyId;
  datePickerOptions: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, private permission: UserGrantPermission, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.datePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false
    };

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      checkValue: [''],
      effDate: [''],
      expDate: [''],
      keyType: [''],
      keyValue: [''],
      refCode: [''],
      statCode: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllTmsKeys()
      .subscribe( data => {
          console.log(data)
          const tmsKeys: any = data
          this.tmsKeys = tmsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  isTmsKeyCreate() {
    return this.permission.isPermission(UserGrant.SYSTEM_KEYS_CREATE);
  }

  isTmsKeySave() {
    return this.permission.isPermission(UserGrant.SYSTEM_KEYS_UPDATE);
  }

  public createTmsKey() {
    const entity: any = tmsKeyNew();
    console.log(entity)
    this.selectedTmsKey = entity;
    this.editForm.setValue(entity);
  }

  public selectTmsKey(tmsKey) {
    console.log(tmsKey)
    this.selectedTmsKey = Object.assign({}, tmsKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToTmsKey(tmsKey);
    this.editForm.setValue(entity);
  }

  public selectTmsKeyId(tmsKey) {
    if (this.selectedTmsKeyId === tmsKey.id) {
      this.selectTmsKey(tmsKey);
    } else {
      this.selectedTmsKeyId = tmsKey.id;
    }
  }

  public closeTmsKey() {
    this.selectedTmsKey = null;
  }

  public onSubmit() {
    const dto = tmsKeyToDto(this.selectedTmsKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createTmsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Создать', 'Ключ системы');
            this.pageRefresh(); // created successfully.
          },
          error => {
            this.showError('Создать', 'Ключ системы');
          });
    } else {
      this.apiService.updateTmsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Сохранить', 'Ключ системы ' + dto.id);
            this.pageRefresh(); // updated successfully.
          },
          error => {
            this.showError('Сохранить', 'Ключ системы ' + dto.id);
          });
    }
    this.closeTmsKey();
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
    this.apiService.findAllTmsKeys()
      .subscribe( data => {
          console.log(data)
          const anyData: any = data
          const tmsKeys = anyData
          this.tmsKeys = tmsKeys.content;
          this.showSuccess('Обновить', 'Ключи системы');
        },
        error => {
          this.showError('Обновить', 'Ключи системы');
        });
  }
}
