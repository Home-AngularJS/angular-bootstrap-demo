import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToReceiptTemplate, receiptTemplateNew, receiptTemplateToDto } from '../../core/model/receipt-template.model';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

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
          alert( JSON.stringify(error) );
        });
  }

  public createReceiptTemplate() {
    const dto: any = receiptTemplateNew();
    this.selectedReceiptTemplate = dto;
    this.editForm.setValue(dto);
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
          },
          error => {
            alert( JSON.stringify(error) );
          });
      this.selectReceiptTemplate(receiptTemplate);
    } else {
      this.selectedReceiptTemplateId = receiptTemplate.id;
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
          alert( JSON.stringify(error) );
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
        this.pageRefresh(); // created successfully.
      },
      error => {
        alert( JSON.stringify(error) );
      });
    } else {
      this.apiService.updateReceiptTemplate(dto)
      .pipe(first())
      .subscribe(
        data => {
        this.selectedReceiptTemplate = dto;
        this.editForm.setValue(entity);
        this.pageRefresh(); // updated successfully.
      },
      error => {
        alert( JSON.stringify(error) );
      });
    }
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
        },
        error => {
          alert( JSON.stringify(error) );
        });
  }
}
