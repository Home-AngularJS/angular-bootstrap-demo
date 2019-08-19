import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTmsKey, tmsKeyNew, tmsKeyToDto } from '../../core/model/tms-key.model';

@Component({
  selector: 'app-tms-key',
  templateUrl: './tms-key.component.html',
  styleUrls: ['./tms-key.component.css']
})
export class TmsKeyComponent implements OnInit {

  tmsKeys;
  editForm: FormGroup;
  selectedTmsKey;
  selectedTmsKeyId;
  myDatePickerOptions: any;
  effDate;
  expDate;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.myDatePickerOptions = {
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
    this.apiService.findAllTmsKeys()
      .subscribe( data => {
          console.log(data)
          const anyData: any = data
          const tmsKeys = anyData
          this.tmsKeys = tmsKeys.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public createTmsKey() {
    const entity: any = tmsKeyNew();
    console.log(entity)
    this.selectedTmsKey = entity;
    this.editForm.setValue(entity);
  }

  public selectTmsKey(tmsKey) {
    console.log(tmsKey);
    this.effDate = { jsdate: new Date(tmsKey.effDate) };
    this.expDate = { jsdate: new Date(tmsKey.expDate) };
    this.selectedTmsKey = tmsKey;
    const entity: any = dtoToTmsKey(tmsKey);
    this.editForm.setValue(entity);
  }

  public selectTmsKeyId(tmsKey) {
    if (this.selectedTmsKeyId === tmsKey.id) {
      this.selectTmsKey(tmsKey);
    } else {
      this.selectedTmsKeyId = tmsKey.id;
    }
  }

  public closeTmsKey() {
    this.selectedTmsKey = null;
  }

  public onSubmit() {
    const dto = tmsKeyToDto(this.editForm.value);
    if (dto.id === null) {
      this.apiService.createCardMaskGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateCardMaskGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
