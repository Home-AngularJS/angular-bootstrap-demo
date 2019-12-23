import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToReceiptTemplate, isNotEmpty, receiptTemplateNew, receiptTemplateToDto } from '../../core/model/receipt-template.model';
import { DomSanitizer } from '@angular/platform-browser';
import { dtoToReceiptTemplatePreview, receiptTemplatePreviewToDto } from '../../core/model/receipt-template-preview.model';

/**
 * @see https://www.linkedin.com/pulse/working-iframe-angular-thiago-adriano
 */
@Pipe({ name: 'safe2' })
export class SafePipe2 implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-receipt-template',
  templateUrl: './receipt-template.component.html',
  styleUrls: ['./receipt-template.component.css']
})
export class ReceiptTemplateComponent implements OnInit {
  receiptTemplates;
  editForm: FormGroup;
  selectedReceiptTemplate;
  selectedReceiptTemplateId;
  transactionDatePickerOptions: any;
  iframeReceiptNumber = this.apiService.receiptTemplatePreviewUrl + '/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  isButtonSave: Boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.transactionDatePickerOptions = {
      dateFormat: 'dd.mm.yyyy',
      selectionTxtFontSize: '12px',
      alignSelectorRight: true,
      showClearDateBtn: false,
      componentDisabled: false
    };

    this.editForm = this.formBuilder.group({
      id: [''],
      templateName: [''],
      templateStyle: [''],
      templateBody: ['']
    });

    /**
     * DEV. Profile
     */

    /**
     * PROD. Profile
     */
    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          const receiptTemplates: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const receiptTemplate: any = data.content[i];
            var entity: any = dtoToReceiptTemplate(receiptTemplate);
            receiptTemplates.push(entity);
          }
          this.receiptTemplates = receiptTemplates;
        },
        error => {
          // alert( JSON.stringify(error) );
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

  public createReceiptTemplate() {
    const dto: any = receiptTemplateNew();
    this.selectedReceiptTemplate = dto;
    this.editForm.setValue(dto);
    console.log('isButtonSave = false')
    this.isButtonSave = false;
  }

  public selectReceiptTemplate(receiptTemplate) {
    console.log(receiptTemplate);
    this.selectedReceiptTemplate = receiptTemplate;
    const entity: any = dtoToReceiptTemplate(receiptTemplate);
    console.log(entity)
    this.editForm.setValue(entity);
  }

  public selectReceiptTemplateId(receiptTemplate) {
    if (this.selectedReceiptTemplateId === receiptTemplate.id) {
      const dto = receiptTemplatePreviewToDto(receiptTemplate);
      this.apiService.saveReceiptTemplatePreview(dto)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data)
            const entityPreview = dtoToReceiptTemplatePreview(data);
            this.iframeReceiptNumber = this.apiService.receiptTemplatePreviewUrl + '/' + entityPreview.id;
            this.isButtonSave = true;
          },
          error => {
            // alert( JSON.stringify(error) );
          });
      this.selectReceiptTemplate(receiptTemplate);
    } else {
      this.selectedReceiptTemplateId = receiptTemplate.id;
    }
  }

  public onChangeButtonSave(item: any) {
    const entity = this.editForm.value;
    if (isNotEmpty(entity.templateName)
        && isNotEmpty(entity.templateBody)) {
      this.isButtonSave = true;
    } else {
      this.isButtonSave = false;
    }
  }

  public closeReceiptTemplate() {
    this.selectedReceiptTemplate = null;
  }

  public receiptTemplatePreview() {
    this.selectedReceiptTemplate.id = null;
    const entity = this.editForm.value;
    const dto = receiptTemplatePreviewToDto(entity);
    this.apiService.saveReceiptTemplatePreview(dto)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          const entityPreview = dtoToReceiptTemplatePreview(data);
          this.iframeReceiptNumber = this.apiService.receiptTemplatePreviewUrl + '/' + entityPreview.id
          this.selectedReceiptTemplate.id = entity.id;
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  public onSubmit() {
    const entity = this.editForm.value;
    const dto = receiptTemplateToDto(entity);
    if (dto.id === null) {
      this.apiService.createReceiptTemplate(dto)
      .pipe(first())
      .subscribe(
        data => {
        this.selectedReceiptTemplate = dto;
        this.editForm.setValue(entity);
          this.showSuccess('Создать', 'Шаблон чека');
        this.pageRefresh(); // created successfully.
      },
      error => {
        this.showError('Создать', 'Шаблон чека');
      });
    } else {
      this.apiService.updateReceiptTemplate(dto)
      .pipe(first())
      .subscribe(
        data => {
        this.selectedReceiptTemplate = dto;
        this.editForm.setValue(entity);
        this.showSuccess('Сохранить', 'Шаблон чека ' + entity.id);
        this.pageRefresh(); // updated successfully.
      },
      error => {
        this.showError('Сохранить', 'Шаблон чека ' + entity.id);
      });
    }
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
    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          const receiptTemplates: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const receiptTemplate: any = data.content[i];
            var entity: any = dtoToReceiptTemplate(receiptTemplate);
            receiptTemplates.push(entity);
          }
          this.receiptTemplates = receiptTemplates;
          this.showSuccess('Обновить', 'Шаблон чеков');
        },
        error => {
          this.showError('Обновить', 'Шаблон чеков');
        });
  }
}
