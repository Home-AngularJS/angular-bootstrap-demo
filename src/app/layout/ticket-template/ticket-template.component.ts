import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTicketTemplate, ticketTemplateNew, ticketTemplateToDto } from '../../core/model/ticket-template.model';

@Component({
  selector: 'app-ticket-template',
  templateUrl: './ticket-template.component.html',
  styleUrls: ['./ticket-template.component.css']
})
export class TicketTemplateComponent implements OnInit {

  ticketTemplates;
  editForm: FormGroup;
  selectedTicketTemplate;
  selectedTicketTemplateId;
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
    this.ticketTemplates = this.dataService.findAllTicketTemplates();
  }

  public createTicketTemplate() {
    const entity: any = ticketTemplateNew();
    console.log(entity)
    this.selectedTicketTemplate = entity;
    this.editForm.setValue(entity);
  }

  public selectTicketTemplate(ticketTemplate) {
    console.log(ticketTemplate);
    this.selectedTicketTemplate = ticketTemplate;
    this.transactionDate = { jsdate: new Date(ticketTemplate.transactionDate) };
    this.selectedTicketTemplate.typeOperationText = this.getTypeOperationText(this.selectedTicketTemplate);
    this.selectedTicketTemplate.respCodeText = this.getRespCodeText(this.selectedTicketTemplate);
    const entity: any = dtoToTicketTemplate(ticketTemplate);
    this.editForm.setValue(entity);
  }

  public selectTicketTemplateId(ticketTemplate) {
    if (this.selectedTicketTemplateId === ticketTemplate.id) {
      this.selectTicketTemplate(ticketTemplate);
    } else {
      this.selectedTicketTemplateId = ticketTemplate.id;
    }
  }

  public closeTicketTemplate() {
    this.selectedTicketTemplate = null;
  }

  public onSubmit() {
    const entity = this.editForm.value;
    entity.transactionDate = new Date();
    this.selectedTicketTemplate = entity;
    const dto = ticketTemplateToDto(entity);
    if (dto.id === null) {
      this.dataService.createTicketTemplate(dto)
        // .pipe(first())
        // .subscribe(
        //   data => {
            // this.pageRefresh(); // created successfully.
          // },
          // error => {
          //   alert( JSON.stringify(error) );
          // });
    } else {
      this.dataService.updateTicketTemplate(dto)
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

  public buildPreview(cardMaskGroup) {
    const beginMask = cardMaskGroup.beginMask;
    const endMask = cardMaskGroup.endMask;
    const maskSymbol = cardMaskGroup.maskSymbol;
    let preview: string = '';
    for (let n = 0; n < beginMask; n++) {
      preview += n+1;
    }
    preview += maskSymbol;
    for (let n = 0; n < endMask; n++) {
      preview += n+1;
    }

    return preview;
  }

  public getTypeOperationText(selectedTicketTemplate) {
    if (selectedTicketTemplate.typeOperation === '00') {
      return selectedTicketTemplate.respCodeTextPayment;
    }
    if (selectedTicketTemplate.typeOperation === '26') {
      return selectedTicketTemplate.respCodeTextReturn;
    }
  }

  public getRespCodeText(selectedTicketTemplate) {
    if (selectedTicketTemplate.respCode === '00') {
      return selectedTicketTemplate.typeOperationTextSuccess;
    } else {
      return selectedTicketTemplate.typeOperationTextNotsuccess;
    }
  }
}
