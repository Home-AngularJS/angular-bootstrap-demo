import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTicketTemplate, ticketTemplateNew } from '../../core/model/ticket-template.model';

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

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      ticketName: [''],
      template: [''],
      mName: [''],
      mLocation: [''],
      termId: [''],
      merchId: [''],
      recNum: [''],
      amount: [''],
      panSale: [''],
      panMaska: [''],
      expDate: [''],
      respCode: [''],
      authCode: [''],
      rrn: [''],
      seqNum: [''],
      clientName: ['']
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
    // entity.preview = this.buildPreview(entity);
    // this.selectedCardMaskGroup = entity;
    // const dto = cardMaskGroupToDto(entity);
    // if (dto.id === null) {
    //   this.apiService.createCardMaskGroup(dto)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //         // this.pageRefresh(); // created successfully.
    //       },
    //       error => {
    //         alert( JSON.stringify(error) );
    //       });
    // } else {
    //   this.apiService.updateCardMaskGroup(dto)
    //     .pipe(first())
    //     .subscribe(
    //       data => {
    //         // this.pageRefresh(); // updated successfully.
    //       },
    //       error => {
    //         alert( JSON.stringify(error) );
    //       });
    // }
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
}
