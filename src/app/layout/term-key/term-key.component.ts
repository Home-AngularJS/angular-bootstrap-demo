import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTermKey, termKeyNew, termKeyToDto } from '../../core/model/term-key.model';
import { UserGrantPermission } from '../../core/model/user-role.model';

@Component({
  selector: 'app-term-key',
  templateUrl: './term-key.component.html',
  styleUrls: ['./term-key.component.css']
})
export class TermKeyComponent implements OnInit {

  termKeys;
  editForm: FormGroup;
  selectedTermKey;
  selectedTermKeyId;
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
    this.apiService.findAllTermKeys()
      .subscribe( data => {
          console.log(data)
          const termKeys: any = data
          this.termKeys = termKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public createTermKey() {
    const entity: any = termKeyNew();
    console.log(entity)
    this.selectedTermKey = entity;
    this.editForm.setValue(entity);
  }

  public selectTermKey(termKey) {
    console.log(termKey)
    this.selectedTermKey = Object.assign({}, termKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToTermKey(termKey);
    this.editForm.setValue(entity);
  }

  public selectTermKeyId(termKey) {
    if (this.selectedTermKeyId === termKey.id) {
      this.selectTermKey(termKey);
    } else {
      this.selectedTermKeyId = termKey.id;
    }
  }

  public closeTermKey() {
    this.selectedTermKey = null;
  }

  public onSubmit() {
    const dto = termKeyToDto(this.selectedTermKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createTermKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Создать', 'Ключ терминала ');
            this.pageRefresh(); // created successfully.
          },
          error => {
            this.showError('Создать', 'Ключ терминала ');
          });
    } else {
      this.apiService.updateTermKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.showSuccess('Сохранить', 'Ключ терминала ' + dto.id);
            this.pageRefresh(); // updated successfully.
          },
          error => {
            this.showError('Сохранить', 'Ключ терминала ' + dto.id);
          });
    }
    this.closeTermKey();
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
    this.apiService.findAllTermKeys()
      .subscribe( data => {
          console.log(data)
          const termKeys: any = data
          this.termKeys = termKeys.content;
          this.showSuccess('Обновить', 'Ключи терминалов');
        },
        error => {
          this.showError('Обновить', 'Ключи терминалов');
        });
  }
}
