import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
  datePickerOptions: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private location: Location, private apiService: ApiService, public dataService: DataService) { }

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
    this.apiService.findAllTmsKeys()
      .subscribe( data => {
          console.log(data)
          const tmsKeys: any = data
          this.tmsKeys = tmsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
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
    console.log(tmsKey)
    this.selectedTmsKey = Object.assign({}, tmsKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
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
    const dto = tmsKeyToDto(this.selectedTmsKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createTmsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateTmsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
    }
    this.closeTmsKey();
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
    this.apiService.findAllTmsKeys()
      .subscribe( data => {
          console.log(data)
          const anyData: any = data
          const tmsKeys = anyData
          this.tmsKeys = tmsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }
}
