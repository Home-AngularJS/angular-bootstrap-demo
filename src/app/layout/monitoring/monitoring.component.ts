import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {
  hourlyAnalytics = [];
  attestation: any = {};
  transaction: any = {};

  constructor(private router: Router, private toastr: ToastrService, private datePipe: DatePipe, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */
    this.apiService.findTransactionsAnalytics()
      .subscribe( data => {
          console.log(data)
          // this.viewTransactionsAnalytics(Object.assign({}, data.monthlyAnalytics));
          this.viewTransactionsAnalytics(Object.assign({}, data.dailyAnalytics));
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика', 'Message: ' + error.message);
        });

    this.apiService.getMonitoringData()
      .subscribe( data => {
          console.log(data)
          this.viewMonitoring(data);
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Мониторинг', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Мониторинг', 'Message: ' + error.message);
        });

    /**
     * DEV. Profile
     */
  }
  viewTransactionsAnalytics(analytics) {
    this.hourlyAnalytics = [
      {'name': 'Успешно', 'series': this.pullHourlyAnalytics(analytics.successfulHourlyAnalytics)},
      {'name': 'Отказ', 'series': this.pullHourlyAnalytics(analytics.declinedHourlyAnalytics)}
    ];
  }

  viewMonitoring(data) {
    this.attestation.status = data.attestationStatus;
    this.attestation.statusPeriodMin = data.attestationStatusPeriodMin;
    this.attestation.lastSuccessfulDate = data.lastSuccessfulAttestationDate;
    this.transaction.status = data.transactionStatus;
    this.transaction.statusPeriodMin = data.transactionStatusPeriodMin;
    this.transaction.lastSuccessfulDate = data.lastSuccessfulTransactionDate;
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

  public async pageRefresh() {
    this.apiService.findTransactionsAnalytics()
      .subscribe( data => {
          console.log(data)
          // this.viewTransactionsAnalytics(Object.assign({}, data.monthlyAnalytics));
          this.viewTransactionsAnalytics(Object.assign({}, data.dailyAnalytics));
          this.showSuccess('Аналитика', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика', 'Message: ' + error.message);
        });

    await this.delay();

    this.apiService.getMonitoringData()
      .subscribe( data => {
          console.log(data)
          this.viewMonitoring(data);
          this.showSuccess('Мониторинг', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Мониторинг', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Мониторинг', 'Message: ' + error.message);
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