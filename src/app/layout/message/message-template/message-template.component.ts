import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { MessageTemplateService } from '../../../core/service/message-template.service';
import { MessageTemplateDefaultSettings } from '../../../core/service/message-template-default.settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../../../core/service/api.service';

const providers = [{
  provide: SmartTable,
  useFactory: (service: MessageTemplateService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [MessageTemplateService, MessageTemplateDefaultSettings]
}];

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.css'],
  providers
})
export class MessageTemplateComponent implements OnInit {
  selectedMessageTemplate;
  selectedMessageTemplateId;
  editForm: FormGroup;
  title;
  message: string = null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private http: HttpClient, private toastr: ToastrService, private apiService: ApiService, private service: MessageTemplateService) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      id: [''],
      text: [''],
      shortText: ['']
    });

    /**
     * PROD. Profile
     */
  }

  public selectMessageTemplate(messageTemplate) {
    console.log(messageTemplate);
    this.selectedMessageTemplate = messageTemplate;
    if (messageTemplate != null) {
      this.editForm.setValue(messageTemplate);
    }
  }

  public selectMessageTemplateId(messageTemplate) {
    if (this.selectedMessageTemplateId === messageTemplate.id) {
      this.selectMessageTemplate(messageTemplate);
    } else {
      this.selectedMessageTemplateId = messageTemplate.id;
    }
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://stackoverflow.com/questions/49194316/override-a-components-default-sass-variables-in-a-different-angular-cli-project
   * https://github.com/scttcper/ngx-toastr
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

  public onSubmitDelete(messageTemplateId: any) {
    this.apiService.deleteMessageTemplate(messageTemplateId)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess(messageTemplateId, 'Удалить');
          // this.pageRefresh(); // updated successfully.
        },
        error => {
          this.showError(messageTemplateId, 'Удалить');
        });
  }

  public selectPage(select: any) {
    console.log(select)
    return parseInt(select);
  }

  public selectLastPage(length: any, size: any) {
    const _length = parseInt(length);
    const _size = parseInt(size);
    const max = _length / _size;
    const _lastPage = Math.round(max);
    return (_lastPage < max) ? _lastPage + 1 : _lastPage;
  }
}
