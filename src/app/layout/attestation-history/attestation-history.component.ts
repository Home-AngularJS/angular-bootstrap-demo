import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { filterAttestationHistoryFormEmpty, getBtnFilter } from '../../core/model/attestation.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { AttestationHistoryService } from '../../core/service/attestation-history.service';
import { AttestationHistoryDefaultSettings } from '../../core/service/attestation-history-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';

const providers = [{
  provide: SmartTable,
  useFactory: (service: AttestationHistoryService, settings: TableState) => of([], settings, server({
    query: (tableState) => service.query(tableState)
  })),
  deps: [AttestationHistoryService, AttestationHistoryDefaultSettings]
}];

@Component({
  selector: 'app-attestation-history',
  templateUrl: './attestation-history.component.html',
  styleUrls: ['./attestation-history.component.css'],
  providers
})
export class AttestationHistoryComponent implements OnInit {
  statusChoices;
  allAttestation = [];
  attestationSettings = {};
  filterForm: FormGroup;
  @ViewChild('filter') filter: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalFilter: Boolean = false;
  animationSettings: Object = { effect: 'None' };
  title;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: AttestationHistoryService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.allAttestation = this.dataService.getAllAttestation();

    this.attestationSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
    };

    this.filterForm = this.formBuilder.group({
      deviceSn: [''],
      deviceName: [''],
      attestationPhase: [''],
      date: [''],
      attestations: ['']
    });

    this.route
      .queryParams
      .subscribe(params => {
        const deviceSn = params['deviceSn'];
        if (deviceSn===undefined) {
        } else {
          this.title = ' ➠ ' + deviceSn;
        }
      });

    this.statusChoices = this.dataService.getStatusChoices();
  }

  public openFilter: EmitType<object> = () => {
    this.filterForm.setValue(this.service.filter);

    document.getElementById('filter').style.display = 'block';
    this.isModalFilter = true;
    this.filter.show();
  }

  public onFilter: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterAttestationHistoryFormEmpty());
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  public btnFilter(filter: any) {
    const filters = filter.split('&');
    if (Array.isArray(filters) && filters.length && 1<filters.length) {
      for (let f = 0; f < filters.length; f++) {
        const _filter = getBtnFilter(filters[f]);
        if (_filter.field==='deviceSn') this.title = _filter.value!='' ? ' ➠ ' + _filter.value : _filter.value;
      }
    } else {
      const _filter = getBtnFilter(filter);
      if (_filter.value!='') this.title = ' ➠ ' + _filter.value;
    }
    return filter;
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

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

}
