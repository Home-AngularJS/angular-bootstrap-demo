import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToIpsKey, ipsKeyNew, ipsKeyToDto } from '../../core/model/ips-key.model';
import { UserGrantPermission } from '../../core/model/user-role.model';

@Component({
  selector: 'app-ips-key',
  templateUrl: './ips-key.component.html',
  styleUrls: ['./ips-key.component.css']
})
export class IpsKeyComponent implements OnInit {

  ipsKeys;
  editForm: FormGroup;
  selectedIpsKey;
  selectedIpsKeyId;
  datePickerOptions: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, private permission: UserGrantPermission, public dataService: DataService) { }

  ngOnInit() {
    this.datePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false
    };

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      rid: [''],
      index: [''],
      exponentLength: [''],
      exponentValue: [''],
      modulusLength: [''],
      modulus: [''],
      secureHashAlg: [''],
      caHashAlgInd: [''],
      caPkAlgInd: [''],
      keyExpDate: [''],
      scheme: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllIpsKeys()
      .subscribe( data => {
          console.log(data)
          const ipsKeys: any = data
          this.ipsKeys = ipsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public createIpsKey() {
    const entity: any = ipsKeyNew();
    console.log(entity)
    this.selectedIpsKey = entity;
    this.editForm.setValue(entity);
  }

  public selectIpsKey(ipsKey) {
    console.log(ipsKey)
    this.selectedIpsKey = Object.assign({}, ipsKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToIpsKey(ipsKey);
    this.editForm.setValue(entity);
  }

  public selectIpsKeyId(ipsKey) {
    if (this.selectedIpsKeyId === ipsKey.id) {
      this.selectIpsKey(ipsKey);
    } else {
      this.selectedIpsKeyId = ipsKey.id;
    }
  }

  public closeIpsKey() {
    this.selectedIpsKey = null;
  }

  public onSubmit() {
    const dto = ipsKeyToDto(this.selectedIpsKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createIpsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Создать', 'Ключ платежной системы');
            this.pageRefresh(); // created successfully.
          },
          error => {
            this.showError('Создать', 'Ключ платежной системы');
          });
    } else {
      this.apiService.updateIpsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Сохранить', 'Ключ платежной системы ' + dto.id);
            this.pageRefresh(); // updated successfully.
          },
          error => {
            this.showError('Сохранить', 'Ключ платежной системы ' + dto.id);
          });
    }
    this.closeIpsKey();
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
    this.apiService.findAllIpsKeys()
      .subscribe( data => {
          console.log(data)
          const ipsKeys: any = data
          this.ipsKeys = ipsKeys.content;
          this.showSuccess('Обновить', 'Ключи платежной системы');
        },
        error => {
          this.showError('Обновить', 'Ключи платежной системы');
        });
  }
}
