import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { multiselectToEntity } from '../../core/model/receipt-send-channel.model';
import {
  attestationActionsToUpdate,
  attestationThreadsToUpdate,
  attestationThreatSequenceNew,
  nameToAttestationActionKeys,
  dtoToAttestationActions,
  nameToAttestationThreadKeys,
  dtoToAttestationThreads,
  dtoToAttestationThreatSequence,
  valuesToAttestationActionKeys,
  updateAttestationThreatSequence
} from '../../core/model/attestation.model';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-bank2',
  templateUrl: './bank2.component.html',
  styleUrls: ['./bank2.component.css']
})
export class Bank2Component implements OnInit {
  attestationThreadlogs = [];
  takeChoices;
  statusChoices;
  allAttestationThreads;
  selectedAttestationThreadlog;
  selectedAttestationThreadlogId;
  allAttestationActionNames = [];
  attestationActionNamesSettings = {};
  attestationThreadlogForm: FormGroup;
  @ViewChild('attestationThreadlog') attestationThreadlog: DialogComponent;
  showCloseIcon: Boolean = true;
  isModalAttestationThreadlog: Boolean = false;
  animationSettings: Object = { effect: 'Zoom' };

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.attestationThreadlogForm = this.formBuilder.group({
      id: [''],
      debug: [''],
      emulator: [''],
      root: [''],
      channelIntegrity: [''],
      geoPosition: [''],
      velocity: [''],
      attestationActions: [''],
      attestationActionNames: [''],
      attestationActionShortNames: [''],
      enabled: [''],
      color: [''],
      integrity: [''],
    });

    /**
     * DEV. Profile
     */
    this.attestationActionNamesSettings = {
      itemsShowLimit: 1,
      noDataAvailablePlaceholderText: 'нет данных',
      selectAllText: 'Выбрать все',
      unSelectAllText: 'Игнорировать все',
      // maxHeight: 90,
    };
    this.allAttestationActionNames = this.dataService.getAllAttestationActionNames();

    this.allAttestationThreads = this.dataService.getAllAttestationThreads();
    this.takeChoices = this.dataService.getTakeChoices();
    this.statusChoices = this.dataService.getStatusChoices();

    /**
     * PROD. Profile
     */
    this.apiService.findAllAttestationThreatSequences()
      .subscribe( data => {
          console.log(data)
          this.attestationThreadlogs = [];
          for (let i = 0; i < data.content.length; i++) {
            this.attestationThreadlogs.push(dtoToAttestationThreatSequence(data.content[i]));
          }
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  public selectAttestationThreadlog(attestationThreadlog) {
    console.log(attestationThreadlog);
    this.selectedAttestationThreadlog = attestationThreadlog;
    if (attestationThreadlog != null) {
      this.attestationThreadlogForm.setValue(attestationThreadlog);
      this.openAttestationThreadlog();
    }
  }

  public selectAttestationThreadlogId(attestationThreadlog) {
    if (this.selectedAttestationThreadlogId === attestationThreadlog.id) {
      this.selectAttestationThreadlog(attestationThreadlog);
    } else {
      this.selectedAttestationThreadlogId = attestationThreadlog.id;
    }
  }

  public onItemSelect(item: any) {
  }

  public onSelectAll(items: any) {
  }

  /**
   * https://github.com/scttcper/ngx-toastr
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread
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

  private delay() {
    const ms: number = 350;
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public openAttestationThreadlog: EmitType<object> = () => {
    document.getElementById('attestationThreadlog').style.display = 'block';
    this.isModalAttestationThreadlog = true;
    this.attestationThreadlog.show();
  }

  public onAttestationThreadlog: EmitType<object> = () => {
    // save or update:
    document.getElementById('btnApply').onclick = (): void => {
      const entity = this.attestationThreadlogForm.value;
      console.log(entity)
      multiselectToEntity(entity.attestationActions);

      if (entity.id === null) {
        const entityUpdate: any = updateAttestationThreatSequence(entity)
        entityUpdate.integrity = 'N'; //TODO: ?
        this.apiService.createAttestationThreatSequence(entityUpdate)
          .pipe(first())
          .subscribe(
            data => {
              this.attestationThreatSequencesRefresh(); // updated successfully.
              this.attestationThreadlog.hide();
              this.showSuccess('Создать', 'Последовательность угроз');
            },
            error => {
              this.showError('Создать', 'Последовательность угроз');
            });
      } else {
        this.apiService.updateAttestationThreatSequence(entity.id, updateAttestationThreatSequence(entity))
          .pipe(first())
          .subscribe(
            data => {
              this.attestationThreatSequencesRefresh(); // updated successfully.
              this.attestationThreadlog.hide();
              this.showSuccess('Сохранить', 'Последовательность угроз');
            },
            error => {
              this.showError('Сохранить', 'Последовательность угроз');
            });
      }
    };

    // cancel:
    document.getElementById('btnCancel').onclick = (): void => {
      this.attestationThreadlog.hide();
    };
  }

  public offAttestationThreadlog: EmitType<object> = () => {
  }

  private attestationThreatSequencesRefresh() {
    this.apiService.findAllAttestationThreatSequences()
      .subscribe( data => {
          console.log(data)
          this.attestationThreadlogs = [];
          for (let i = 0; i < data.content.length; i++) this.attestationThreadlogs.push(dtoToAttestationThreatSequence(data.content[i]));
          this.showSuccess('Обновить', 'Последовательность угроз');
        },
        error => {
          this.showError('Обновить', 'Последовательность угроз');
        });
  }

  public pageRefresh() {
    this.attestationThreatSequencesRefresh();
  }
}
