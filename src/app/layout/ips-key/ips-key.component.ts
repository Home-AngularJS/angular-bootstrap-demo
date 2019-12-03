import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToIpsKey, ipsKeyNew, ipsKeyToDto } from '../../core/model/ips-key.model';

@Component({
  selector: 'app-ips-key',
  templateUrl: './ips-key.component.html',
  styleUrls: ['./ips-key.component.css']
})
export class IpsKeyComponent implements OnInit {

  ipsKeys;
  editForm: FormGroup;
  selectedIpsKey;
  selectedIpsKeyId;
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
      rid: [''],
      index: [''],
      exponentLength: [''],
      exponentValue: [''],
      modulusLength: [''],
      modulus: [''],
      secureHashAlg: [''],
      caHashAlgInd: [''],
      caPkAlgInd: [''],
      keyExpDate: [''],
      scheme: ['']
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllIpsKeys()
      .subscribe( data => {
          console.log(data)
          const ipsKeys: any = data
          this.ipsKeys = ipsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public createIpsKey() {
    const entity: any = ipsKeyNew();
    console.log(entity)
    this.selectedIpsKey = entity;
    this.editForm.setValue(entity);
  }

  public selectIpsKey(ipsKey) {
    console.log(ipsKey)
    this.selectedIpsKey = Object.assign({}, ipsKey); // @see https://hassantariqblog.wordpress.com/2016/10/13/angular2-deep-copy-or-angular-copy-replacement-in-angular2
    const entity: any = dtoToIpsKey(ipsKey);
    this.editForm.setValue(entity);
  }

  public selectIpsKeyId(ipsKey) {
    if (this.selectedIpsKeyId === ipsKey.id) {
      this.selectIpsKey(ipsKey);
    } else {
      this.selectedIpsKeyId = ipsKey.id;
    }
  }

  public closeIpsKey() {
    this.selectedIpsKey = null;
  }

  public onSubmit() {
    const dto = ipsKeyToDto(this.selectedIpsKey, this.editForm.value);
    console.log(dto)

    if (dto.id === null) {
      this.apiService.createIpsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateIpsKey(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            // alert( JSON.stringify(error) );
          });
    }
    this.closeIpsKey();
  }

  public pageRefresh() {
    // location.reload();
    this.apiService.findAllIpsKeys()
      .subscribe( data => {
          console.log(data)
          const ipsKeys: any = data
          this.ipsKeys = ipsKeys.content;
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }
}
