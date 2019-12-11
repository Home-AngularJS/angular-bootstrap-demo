import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { attestationThreadsToUpdate, dtoToAttestationActions, nameToAttestationThreadKeys, dtoToAttestationThreads } from '../../core/model/attestation.model';

@Component({
  selector: 'app-background-job',
  templateUrl: './background-job.component.html',
  styleUrls: ['./background-job.component.css']
})
export class BackgroundJobComponent implements OnInit {
  takeChoices;
  symbolChoices;
  statusChoices;
  allAttestationActions;
  allAttestationThreads;
  editFormAttestationActions: FormGroup;
  editFormAttestationThreads: FormGroup;
  allAttestationActionNames = [];
  attestationActionNamesSettings = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editFormAttestationActions = this.formBuilder.group({
      deviceBlock: [''],
      deviceBlockShortName: [''],
      transactionBlock: [''],
      transactionBlockShortName: [''],
      pinBlock: [''],
      pinBlockShortName: [''],
      manualBlock: [''],
      manualBlockShortName: [''],
      qrBlock: [''],
      qrBlockShortName: [''],
      nfcBlock: [''],
      nfcBlockShortName: [''],
      noBlock: [''],
      noBlockShortName: [''],
    });

    this.editFormAttestationThreads = this.formBuilder.group({
      debug: [''],
      emulator: [''],
      root: [''],
      channelIntegrity: [''],
      geoPosition: [''],
      velocity: [''],
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

    this.allAttestationActions = this.dataService.getAllAttestationActions();
    this.allAttestationThreads = this.dataService.getAllAttestationThreads();
    this.takeChoices = this.dataService.getTakeChoices();
    this.symbolChoices = this.dataService.getSymbolChoices();
    this.statusChoices = this.dataService.getStatusChoices();

    /**
     * PROD. Profile
     */
    this.apiService.findAllAttestationActions()
      .subscribe( data => {
          console.log(data)
          var entity: any = dtoToAttestationActions(data);
          this.editFormAttestationActions.setValue(entity);
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    this.apiService.findAllAttestationThreats()
      .subscribe( data => {
          console.log(data)
          var entity: any = dtoToAttestationThreads(data);
          this.editFormAttestationThreads.setValue(entity);
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  private updateAttestationThreat(id: any, value: any, message) {
    this.apiService.updateAttestationThreat(id, value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess('Сохранить', message); // updated successfully.
        },
        error => {
          this.showError('Сохранить', message);
        });
  }

  private attestationThreatsRefresh() {
    this.apiService.findAllAttestationThreats()
      .subscribe( data => {
          console.log(data)
          var entity: any = dtoToAttestationThreads(data);
          this.editFormAttestationThreads.setValue(entity);
          this.showSuccess('Обновить', 'Угроза');
        },
        error => {
          this.showError('Обновить', 'Угроза');
        });
  }

  public async onSubmitAttestationThreads() {
    const entity = this.editFormAttestationThreads.value;
    console.log(entity)
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'channelIntegrity'), attestationThreadsToUpdate(entity.channelIntegrity), 'Целостность каналов');
    await this.delay();
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'debug'), attestationThreadsToUpdate(entity.debug), 'Тестирование приложения');
    await this.delay();
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'emulator'), attestationThreadsToUpdate(entity.emulator), 'Эмуляция приложения');
    await this.delay();
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'geoPosition'), attestationThreadsToUpdate(entity.geoPosition), 'Гео-позиция');
    await this.delay();
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'root'), attestationThreadsToUpdate(entity.root), 'Права приложения');
    await this.delay();
    this.updateAttestationThreat(nameToAttestationThreadKeys(this.allAttestationThreads, 'velocity'), attestationThreadsToUpdate(entity.velocity), 'Частота транзакций');
    await this.delay();
    this.attestationThreatsRefresh();
  }

  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
  }

  /**
   * https://riptutorial.com/angular2/example/26763/show-alert-message-on-a-condition
   * https://mdbootstrap.com/docs/angular/components/alerts
   */
  // public closeAlert() {
  //   this.displaySuccessAlert = false;
  //   this.displayDangerAlert = false;
  //   this.isSuccessAlertFalse = false;
  // }

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

  public async pageRefresh() {
    this.attestationThreatsRefresh();
  }
}
