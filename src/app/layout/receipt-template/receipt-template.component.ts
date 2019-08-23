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
      template: [''],
      nameBank: [''],
      mName: [''],
      mLocation: [''],
      termId: [''],
      merchId: [''],
      recNum: [''],
      typeOperation: [''],
      typeOperationTextSuccess: [''],
      typeOperationTextNotsuccess: [''],
      amount: [''],
      ips: [''],
      panMaska: [''],
      expDate: [''],
      respCode: [''],
      respCodeTextPayment: [''],
      respCodeTextReturn: [''],
      authCode: [''],
      rrn: [''],
      seqNum: [''],
      transactionDate: ['']
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
    this.receiptTemplates = this.dataService.findAllReceiptTemplates();
  }

  public createReceiptTemplate() {
    const entity: any = receiptTemplateNew();
    console.log(entity)
    this.selectedReceiptTemplate = entity;
    this.editForm.setValue(entity);
  }

  public selectReceiptTemplate(receiptTemplate) {
    console.log(receiptTemplate);
    this.selectedReceiptTemplate = receiptTemplate;
    this.transactionDate = { jsdate: new Date(receiptTemplate.transactionDate) };
    this.selectedReceiptTemplate.typeOperationText = this.getTypeOperationText(this.selectedReceiptTemplate);
    this.selectedReceiptTemplate.respCodeText = this.getRespCodeText(this.selectedReceiptTemplate);
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
    entity.transactionDate = new Date();
    this.selectedReceiptTemplate = entity;
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
          // },
          // error => {
          //   alert( JSON.stringify(error) );
          // });
    }
  }

  public pageRefresh() {
    location.reload();
  }

  public getTypeOperationText(selectedReceiptTemplate) {
    if (selectedReceiptTemplate.typeOperation === '00') {
      return selectedReceiptTemplate.respCodeTextPayment;
    }
    if (selectedReceiptTemplate.typeOperation === '26') {
      return selectedReceiptTemplate.respCodeTextReturn;
    }
  }

  public getRespCodeText(selectedReceiptTemplate) {
    if (selectedReceiptTemplate.respCode === '00') {
      return selectedReceiptTemplate.typeOperationTextSuccess;
    } else {
      return selectedReceiptTemplate.typeOperationTextNotsuccess;
    }
  }
}
