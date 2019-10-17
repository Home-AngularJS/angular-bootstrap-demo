import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToReceiptTemplate, receiptTemplateNew, receiptTemplateToDto } from '../../core/model/receipt-template.model';
import {dtoToTransaction} from '../../core/model/transaction.model';

@Component({
  selector: 'app-parameter-attestation',
  templateUrl: './parameter-attestation.component.html',
  styleUrls: ['./parameter-attestation.component.css']
})
export class ParameterAttestationComponent implements OnInit {

  receiptTemplates;
  editForm: FormGroup;
  selectedReceiptTemplate;
  selectedReceiptTemplateId;
  transactionDatePickerOptions: any;

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
      templateBody: [''],
      nameBank: [''],
      mName: [''],
      mLocation: [''],
      termId: [''],
      merchId: [''],
      recNum: [''],
      typeOperation: [''],
      typeOperationPayTxt: [''],
      typeOperationRefundTxt: [''],
      amount: [''],
      ips: [''],
      panMaska: [''],
      expDate: [''],
      resp: [''],
      respSuccessTxt: [''],
      respFailureTxt: [''],
      authCode: [''],
      rrn: [''],
      seqNum: [''],
      transactionDate: [''],
      transactionDateForm: [''],
      transactionTimeForm: ['']
    });

    /**
     * DEV. Profile
     */
    const data = this.dataService.findAllReceiptTemplates();
    console.log(data)
    const receiptTemplates: any = [];
    for (let i = 0; i < data.length; i++) {
      const receiptTemplate: any = data[i];
      receiptTemplates.push(receiptTemplate);
    }
    this.receiptTemplates = receiptTemplates;

    /**
     * PROD. Profile
     */
    this.apiService.findAllReceiptTemplates()
      .subscribe( data => {
          console.log(data)
          // const receiptTemplates: any = [];
          for (let i = 0; i < data.content.length; i++) {
            const receiptTemplate: any = data.content[i];
            // var entity: any = dtoToReceiptTemplate(receiptTemplate);
            // receiptTemplates.push(entity);
            this.receiptTemplates[i].id = receiptTemplate.id;
            this.receiptTemplates[i].templateName = receiptTemplate.templateName;
            this.receiptTemplates[i].templateStyle = receiptTemplate.templateStyle;
            this.receiptTemplates[i].templateBody = receiptTemplate.templateBody;
          }
          // this.receiptTemplates = receiptTemplates;
        },
        error => {
          // alert( JSON.stringify(error) );
          this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    this.selectedReceiptTemplate = this.receiptTemplates[0];
    this.selectedReceiptTemplateId = this.selectedReceiptTemplate.id;
    this.selectReceiptTemplateId(this.selectedReceiptTemplate);
  }

  public createReceiptTemplate() {
    const dto: any = receiptTemplateNew();
    this.selectedReceiptTemplate = dto;
    this.editForm.setValue(dto);
  }

  public selectReceiptTemplate(receiptTemplate) {
    console.log(receiptTemplate);
    this.selectedReceiptTemplate = receiptTemplate;
    this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(receiptTemplate);
    this.selectedReceiptTemplate.respTxt = this.getRespTxt(receiptTemplate);
    const entity: any = dtoToReceiptTemplate(receiptTemplate);
    this.editForm.setValue(entity);
  }

  public selectReceiptTemplateId(receiptTemplate) {
    if (this.selectedReceiptTemplateId === receiptTemplate.id) {
      this.selectReceiptTemplate(receiptTemplate);
    } else {
      this.selectedReceiptTemplateId = receiptTemplate.id;
    }
  }

  public closeReceiptTemplate() {
    this.selectedReceiptTemplate = null;
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
        this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(dto);
        this.selectedReceiptTemplate.respTxt = this.getRespTxt(dto);
        // const entity: any = dtoToReceiptTemplate(dto);
        this.editForm.setValue(entity);
        this.pageRefresh(); // created successfully.
      },
      error => {
        // alert( JSON.stringify(error) );
        this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      });
    } else {
      this.apiService.updateReceiptTemplate(dto)
      .pipe(first())
      .subscribe(
        data => {
        this.selectedReceiptTemplate = dto;
        this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(dto);
        this.selectedReceiptTemplate.respTxt = this.getRespTxt(dto);
        // const entity: any = dtoToReceiptTemplate(dto);
        this.editForm.setValue(entity);
        this.pageRefresh(); // updated successfully.
      },
      error => {
        // alert( JSON.stringify(error) );
        this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
      });
    }
  }

  public pageRefresh() {
    location.reload();
  }

  public getTypeOperationTxt(receiptTemplate) {
    if (receiptTemplate.typeOperation.value === '00') {
      return receiptTemplate.typeOperationPayTxt;
    }
    if (receiptTemplate.typeOperation.value === '26') {
      return receiptTemplate.typeOperationRefundTxt;
    }
  }

  public getRespTxt(receiptTemplate) {
    if (receiptTemplate.resp.value === '00') {
      return receiptTemplate.respSuccessTxt;
    } else {
      return receiptTemplate.respFailureTxt;
    }
  }
}
