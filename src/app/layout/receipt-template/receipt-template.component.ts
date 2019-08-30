import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToReceiptTemplate, receiptTemplateNew, receiptTemplateToDto } from '../../core/model/receipt-template.model';

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
  transactionDate;
  transactionDateForm;
  transactionTimeForm;

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
      ticketName: [''],
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
     * PROD. Profile
     */
    // this.apiService.findAllCardMaskGroups()
    //   .subscribe( data => {
    //       console.log(data)
    //       const anyData: any = data
    //       const panMaskeds = anyData
    //       this.cardMaskGroups = panMaskeds.content;
    //       for (let i = 0; i < this.cardMaskGroups.length; i++) {
    //         this.cardMaskGroups[i].preview = this.buildPreview(this.cardMaskGroups[i]);
    //       }
    //     },
    //     error => {
    //       alert( JSON.stringify(error) );
    //     });

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
  }

  public createReceiptTemplate() {
    const dto: any = receiptTemplateNew();
    // const entity: any = dtoToReceiptTemplate(dto);
    // console.log(entity)
    this.selectedReceiptTemplate = dto;
    this.editForm.setValue(dto);
  }

  public selectReceiptTemplate(receiptTemplate) {
    console.log(receiptTemplate);
    this.selectedReceiptTemplate = receiptTemplate;
    this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(receiptTemplate);
    this.selectedReceiptTemplate.respTxt = this.getRespTxt(receiptTemplate);
    this.transactionDate = { jsdate: new Date(receiptTemplate.transactionDate.value) };
    this.transactionDateForm = { jsdate: new Date(receiptTemplate.transactionDate.value) };
    this.transactionTimeForm = { jsdate: new Date(receiptTemplate.transactionDate.value) };
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
      this.dataService.createReceiptTemplate(dto)
        // .pipe(first())
        // .subscribe(
        //   data => {
            // this.pageRefresh(); // created successfully.
          // },
          // error => {
          //   alert( JSON.stringify(error) );
          // });
    } else {
      this.dataService.updateReceiptTemplate(dto)
        // .pipe(first())
        // .subscribe(
        //   data => {
            // this.pageRefresh(); // updated successfully.
            this.selectedReceiptTemplate = dto;
            this.selectedReceiptTemplate.typeOperationTxt = this.getTypeOperationTxt(dto);
            this.selectedReceiptTemplate.respTxt = this.getRespTxt(dto);
            this.transactionDate = { jsdate: new Date(dto.transactionDate.value) };
            this.transactionDateForm = { jsdate: new Date(dto.transactionDate.value) };
            this.transactionTimeForm = { jsdate: new Date(dto.transactionDate.value) };
            const entity: any = dtoToReceiptTemplate(dto);
            this.editForm.setValue(entity);
          // },
          // error => {
          //   alert( JSON.stringify(error) );
          // });
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
