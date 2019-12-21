import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  hourlyDateAnalytics = Date.now();
  hourlyStartDateAnalytics = new Date(21 * 3600 * 1000);
  hourlyEndDateAnalytics = new Date();
  hourlyAnalytics = [];
  attestation: any = {};
  transaction: any = {};
  diffLastSuccessfulDate = new Date(21 * 3600 * 1000);
  attestationCheckedLabelStatus = 'OK';
  transactionCheckedLabelStatus = 'OK';
  attestationUncheckedLabelLabelStatus = 'ERROR';
  transactionUncheckedLabelLabelStatus = 'ERROR';
  attestationLabelLabelStatus;
  transactionLabelLabelStatus;
  attestationStatusSwitches = 'error-switches';
  transactionStatusSwitches = 'error-switches';
  attestationWaitingPeriodColor = '#008000';
  transactionWaitingPeriodColor = '#008000';

  constructor(private router: Router, private location: Location, private toastr: ToastrService, private datePipe: DatePipe, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */
    this.apiService.getAttestationAnalytics()
      .subscribe( data => {
          console.log(data)
          this.viewAttestationsAnalytics(Object.assign({}, data));
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Активность аттестации', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Активность аттестации', 'Message: ' + error.message);
        });

    this.apiService.getMonitoringData()
      .subscribe( data => {
          console.log(data)
          this.viewMonitoring(data);
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Статус', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Статус', 'Message: ' + error.message);
        });

    /**
     * DEV. Profile
     */
  }
  viewAttestationsAnalytics(analytics) {
    this.hourlyAnalytics = [
      {'name': 'Успешно', 'series': this.pullHourlyAnalytics(analytics.successfulHourlyAnalytics)},
      {'name': 'Отказ', 'series': this.pullHourlyAnalytics(analytics.declinedHourlyAnalytics)}
    ];
  }

  viewMonitoring(data) {
    if (data != null) {
      const attestationStatus = (data.attestationStatus != null && data.attestationStatus == 'OK') ? true : false;
      const transactionStatus = (data.transactionStatus != null && data.transactionStatus == 'OK') ? true : false;
      if (data.attestationStatus != null && data.attestationStatus == 'WARNING') {
        this.attestationUncheckedLabelLabelStatus = data.attestationStatus;
        this.attestationStatusSwitches = 'warning-switches';
        this.attestationWaitingPeriodColor = '#faa026';
      } else if (data.attestationStatus != null && data.attestationStatus == 'ERROR') {
        this.attestationWaitingPeriodColor = '#a10a28';
      }
      if (data.transactionStatus != null && data.transactionStatus == 'WARNING') {
        this.transactionUncheckedLabelLabelStatus = data.transactionStatus;
        this.transactionStatusSwitches = 'warning-switches';
        this.transactionWaitingPeriodColor = '#faa026';
      } else if (data.transactionStatus != null && data.transactionStatus == 'ERROR') {
        this.transactionWaitingPeriodColor = '#a10a28';
      }
      this.attestationLabelLabelStatus = data.attestationStatus;
      this.transactionLabelLabelStatus = data.transactionStatus;

      const diffAttestationLastSuccessfulDate = Date.now() - data.lastSuccessfulAttestationDate - (3 * 3600 * 1000); // minus 3-hours (time zone)
      const diffTransactionLastSuccessfulDate = Date.now() - data.lastSuccessfulTransactionDate - (3 * 3600 * 1000); // minus 3-hours (time zone)
      this.diffLastSuccessfulDate = (data.lastSuccessfulAttestationDate < data.lastSuccessfulTransactionDate) ? data.lastSuccessfulAttestationDate : data.lastSuccessfulTransactionDate;

      this.attestation.status = attestationStatus;
      this.attestation.statusPeriodMin = data.attestationStatusPeriodMin;
      this.attestation.lastSuccessfulDate = data.lastSuccessfulAttestationDate;
      this.attestation.diffLastSuccessfulDate = diffAttestationLastSuccessfulDate;
      this.transaction.status = transactionStatus;
      this.transaction.statusPeriodMin = data.transactionStatusPeriodMin;
      this.transaction.lastSuccessfulDate = data.lastSuccessfulTransactionDate;
      this.transaction.diffLastSuccessfulDate = diffTransactionLastSuccessfulDate;
    }
  }
  /**
   * https://expertcodeblog.wordpress.com/2018/07/05/typescript-sleep-a-thread/
   */
  private delay() {
    return new Promise(resolve => setTimeout(resolve, 350));
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

  onSelectChart(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivateChart(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivateChart(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  /**
   * https://stackoverflow.com/questions/35446955/how-to-go-back-last-page
   */
  goBack() {
    // window.history.back();
    this.location.back();
  }

  public async pageRefresh() {
    this.apiService.getAttestationAnalytics()
      .subscribe( data => {
          console.log(data)
          this.viewAttestationsAnalytics(Object.assign({}, data));
          this.showSuccess('Активность аттестации', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Активность аттестации', 'Message: ' + error.message);
        });

    await this.delay();

    this.apiService.getMonitoringData()
      .subscribe( data => {
          console.log(data)
          this.viewMonitoring(data);
          this.showSuccess('Статус', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Статус', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Статус', 'Message: ' + error.message);
        });
  }


  private pullHourlyAnalytics(analytics) {
    const hourlyAnalytics = [];
    for (let i = 0; i < analytics.length; i++) {
      const hourlyAnalytic = analytics[i];
      hourlyAnalytics.push({
        'name': this.transformDate(hourlyAnalytic.period),
        'value': Number(hourlyAnalytic.count)
      });
    }
    return hourlyAnalytics;
  }

  private transformDate(date) {
    return this.datePipe.transform(date, 'HH:mm');
  }

  private isEmpty(val) {
    return (val === null || val === undefined || val === '') ? true : false;
  }

  private isNotEmpty(val) {
    return !this.isEmpty(val);
  }
}
