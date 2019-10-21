import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToTermKey, termKeyNew, termKeyToDto } from '../../core/model/term-key.model';

@Component({
  selector: 'app-term-key',
  templateUrl: './term-key.component.html',
  styleUrls: ['./term-key.component.css']
})
export class TermKeyComponent implements OnInit {

  termKeys;
  editForm: FormGroup;
  selectedTermKey;
  selectedTermKeyId;
  datePickerOptions: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

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
    this.apiService.findAllTermKeys()
      .subscribe( data => {
          console.log(data)
          const termKeys: any = data
          this.termKeys = termKeys.content;
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });

    /**
     * DEV. Profile
     */
  }

  public createTermKey() {
    const entity: any = termKeyNew();
    console.log(entity)
    this.selectedTermKey = entity;
    this.editForm.setValue(entity);
  }

  public selectTermKey(termKey) {
    console.log(termKey)
    this.selectedTermKey = Object.assign({}, termKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToTermKey(termKey);
    this.editForm.setValue(entity);
  }

  public selectTermKeyId(termKey) {
    if (this.selectedTermKeyId === termKey.id) {
      this.selectTermKey(termKey);
    } else {
      this.selectedTermKeyId = termKey.id;
    }
  }

  public closeTermKey() {
    this.selectedTermKey = null;
  }

  public onSubmit() {
    const dto = termKeyToDto(this.selectedTermKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createTermKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    } else {
      this.apiService.updateTermKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            alert( JSON.stringify(error) );
            // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
          });
    }
    this.closeTermKey();
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllTermKeys()
      .subscribe( data => {
          console.log(data)
          const termKeys: any = data
          this.termKeys = termKeys.content;
        },
        error => {
          alert( JSON.stringify(error) );
          // this.router.navigate(['login']); //TODO:  GET https://map1.mobo.cards:8093/api/v1/term-keys 401 ?
        });
  }
}
