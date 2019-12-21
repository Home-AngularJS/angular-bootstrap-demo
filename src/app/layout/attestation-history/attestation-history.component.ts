import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { FilterAttestationHistory, FilterFieldValue, appendTitleFilter, clearTitleFilter, filterAttestationHistoryFormEmpty, getBtnFilter, getTitleFilter, isNotEmpty } from '../../core/model/attestation.model';
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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location, private apiService: ApiService, public dataService: DataService, private service: AttestationHistoryService) { }

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
      startDate: [''],
      endDate: [''],
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
        const filter: FilterAttestationHistory = filterAttestationHistoryFormEmpty();
        const deviceSn = params['deviceSn'];
        if (isNotEmpty(deviceSn)) filter.deviceSn = deviceSn;
        this.appendTitle(filter);
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
      const filter: FilterAttestationHistory = this.filterForm.value;
      multiselectToEntity(filter.attestations)
      this.appendTitle(filter);

      this.filter.hide();
    };

    // reset Filter:
    document.getElementById('btnCancel').onclick = (): void => {
      this.filterForm.setValue(filterAttestationHistoryFormEmpty());
      this.clearTitle();
      this.router.navigate(['attestation-history']);
    };
  }

  public offFilter: EmitType<object> = () => {
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public btnFilter(filter: any) {
    this.clearTitle();
    const filters = filter.split('&');
    for (let f = 0; f < filters.length; f++) {
      const _filter = getBtnFilter(filters[f]);
      this.appendTitle(_filter);
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

  /**
   * https://www.typescriptlang.org/docs/handbook/advanced-types.html#typeof-type-guards
   */
  public appendTitle(val) {
    if (isNotEmpty(val.field)) { // if (typeof val === "string") {
      const filter = this.appendTitleByString(val);
      this.filterForm.setValue(filter);
    } else { // if (typeof val === "object") {
      clearTitleFilter();
      this.appendTitleByObject(val);
      this.filterForm.setValue(val);
    }
    this.title = getTitleFilter();
  }

  public clearTitle() {
    const filter: FilterAttestationHistory = filterAttestationHistoryFormEmpty();
    this.filterForm.setValue(filter);
    clearTitleFilter();
    this.title = getTitleFilter();
  }

  private appendTitleByString(fieldValue: FilterFieldValue) {
    const filter: FilterAttestationHistory = this.filterForm.value;
    if (fieldValue.field.indexOf('deviceSn') !== -1 && isNotEmpty(fieldValue.value)) filter.deviceSn = fieldValue.value;
    if (fieldValue.field.indexOf('terminalId') !== -1 && isNotEmpty(fieldValue.value)) filter.terminalId = fieldValue.value;
    if (fieldValue.field.indexOf('attestationPhase') !== -1 && isNotEmpty(fieldValue.value)) filter.attestationPhase = fieldValue.value;
    if (fieldValue.field.indexOf('date') !== -1 && isNotEmpty(fieldValue.value)) filter.date = fieldValue.value;
    if (fieldValue.field.indexOf('startDate') !== -1 && isNotEmpty(fieldValue.value)) filter.startDate = fieldValue.value;
    if (fieldValue.field.indexOf('endDate') !== -1 && isNotEmpty(fieldValue.value)) filter.endDate = fieldValue.value;
    const attestations = [];
    if (fieldValue.field.indexOf('integrity') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('root') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('debug') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('emulator') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('geoPosition') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('velocity') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    if (fieldValue.field.indexOf('channelIntegrity') !== -1 && isNotEmpty(fieldValue.value)) attestations.push(fieldValue.value);
    filter.attestations = attestations;
    return filter;
  }

  private appendTitleByObject(filter: FilterAttestationHistory) {
    appendTitleFilter(filter.deviceSn);
    appendTitleFilter(filter.terminalId);
    appendTitleFilter(filter.attestationPhase);
    appendTitleFilter(filter.date);
    appendTitleFilter(filter.startDate);
    appendTitleFilter(filter.endDate);
    appendTitleFilter(filter.attestations);
  }
}
