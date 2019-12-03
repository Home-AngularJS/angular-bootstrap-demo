import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {FilterAttestationHistory, filterAttestationHistoryFormEmpty, getBtnFilter} from '../../core/model/attestation.model';
import { of, SmartTable, TableState } from 'smart-table-ng';
import server from 'smart-table-server';
import { AttestationHistoryService } from '../../core/service/attestation-history.service';
import { AttestationHistoryDefaultSettings } from '../../core/service/attestation-history-default.settings';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { multiselectToEntity } from '../../core/model/receipt-send-channel.model';

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
  animationSettings: Object = { effect: 'Zoom' };
  title;
  isOnDeSelect = false;
  isOnDeSelectAll = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private apiService: ApiService, public dataService: DataService, private service: AttestationHistoryService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * https://www.npmjs.com/package/angular2-multiselect-dropdown
     * https://nileshpatel17.github.io/ng-multiselect-dropdown
     *
     * https://github.com/NileshPatel17/ng-multiselect-dropdown
     * https://stackblitz.com/edit/ng-multiselect-dropdown
     */
    this.attestationSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      maxHeight: 90,
      // classes: '.ng-multiselect-dropdown'
    };
    this.allAttestation = this.dataService.getAllAttestation();

    this.filterForm = this.formBuilder.group({
      deviceSn: [''],
      terminalId: [''],
      deviceName: [''],
      attestationPhase: [''],
      date: [''],
      attestations: [''],
      integrity: [''],
      root: [''],
      debug: [''],
      emulator: [''],
      geoPosition: [''],
      velocity: [''],
      channelIntegrity: ['']
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
    console.log(this.filterForm.value)

    document.getElementById('filter').style.display = 'block';
    this.isModalFilter = true;
    this.filter.show();
  }

  public onFilter: EmitType<object> = () => {
    // do Filter:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.filterForm.value;
      multiselectToEntity(entity.attestations)

      const filter: FilterAttestationHistory = filterAttestationHistoryFormEmpty();
      filter.attestationPhase = entity.attestationPhase;
      filter.attestations = entity.attestations;
      filter.channelIntegrity = entity.channelIntegrity;
      filter.date = entity.date;
      filter.deviceSn = entity.deviceSn;
      filter.terminalId = entity.terminalId;
      this.filterForm.setValue(filter);

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

  public onDeSelect(item: any) {
    this.isOnDeSelect = true;
  }

  public onSelectAll(items: any) {
  }

  public onDeSelectAll(items: any) {
    this.isOnDeSelectAll = true;
  }

  public multiselectFilter() {
    const entity = this.filterForm.value;
    console.log(entity)
    multiselectToEntity(entity.attestations)

    if (this.isOnDeSelect && entity.attestations.length === 0) {
      this.isOnDeSelect = false;
      return '&integrity=&root=&debug=&emulator=&geoPosition=&velocity=&channelIntegrity=';
    }
    if (this.isOnDeSelectAll) {
      this.isOnDeSelectAll = false;
      return '&integrity=&root=&debug=&emulator=&geoPosition=&velocity=&channelIntegrity=';
    }
    if (0 < entity.attestations.length) {
      let filter = '';
      if (entity.attestations.indexOf('Целостность приложения') !== -1) filter += '&integrity=Y';
      if (entity.attestations.indexOf('Права приложения') !== -1) filter += '&root=Y';
      if (entity.attestations.indexOf('Тестирование приложения') !== -1) filter += '&debug=Y';
      if (entity.attestations.indexOf('Эмуляция приложения') !== -1) filter += '&emulator=Y';
      if (entity.attestations.indexOf('Гео-позиция') !== -1) filter += '&geoPosition=Y';
      if (entity.attestations.indexOf('Частота транзакций') !== -1) filter += '&velocity=Y';
      if (entity.attestations.indexOf('Целостность каналов') !== -1) filter += '&channelIntegrity=Y';
      return filter === '' ? null : filter;
    }
  }
}
