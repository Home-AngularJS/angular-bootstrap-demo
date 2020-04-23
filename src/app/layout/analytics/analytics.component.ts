import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  hourlyDateAnalytics = Date.now();
  hourlyStartDateAnalytics = moment(); //hourlyStartDateAnalytics = new Date(21 * 3600 * 1000); //TODO:  @see https://stackoverflow.com/questions/41505492/how-to-subtract-one-month-using-moment-js/41505553
  hourlyEndDateAnalytics = moment(); //hourlyEndDateAnalytics = new Date(21 * 3600 * 1000); //TODO:  @see https://stackoverflow.com/questions/41505492/how-to-subtract-one-month-using-moment-js/41505553
  hourlyAnalytics = [];
  statusAmountAnalytics = [];
  statusCountAnalytics = [];
  entryModeAnalytics = [];
  formFactorAnalytics = [];
  declinedAnalytics = [];
  visa = { 'paymentSystemName':'Visa', 'count':0 }
  mastercard = { 'paymentSystemName':'MasterCard', 'count':0 }
  paymentSystemAnalytics = [];
  dailyAnalytics = [];
  monthlyStartDateAnalytics = moment().subtract(1, 'months') //TODO:  @see https://stackoverflow.com/questions/41505492/how-to-subtract-one-month-using-moment-js/41505553
  monthlyEndDateAnalytics = moment() //TODO:  @see https://stackoverflow.com/questions/41505492/how-to-subtract-one-month-using-moment-js/41505553
  monthlyStatusAmountAnalytics = [];
  monthlyStatusCountAnalytics = [];
  monthlyEntryModeAnalytics = [];
  monthlyFormFactorAnalytics = [];
  monthlyDeclinedAnalytics = [];
  monthlyVisa = { 'paymentSystemName':'Visa', 'count':0 }
  monthlyMastercard = { 'paymentSystemName':'MasterCard', 'count':0 }
  monthlyPaymentSystemAnalytics = [];

  constructor(private router: Router, private location: Location, private toastr: ToastrService, private datePipe: DatePipe, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * PROD. Profile
     */
    this.apiService.findDailyTransactionsAnalytics()
      .subscribe( data => {
          console.log(data)
          this.viewTransactionsAnalytics(Object.assign({}, data));
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика за текущий день', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика за текущий день', 'Message: ' + error.message);
        });

    this.apiService.findTransactionsAnalytics(this.monthlyStartDateAnalytics, this.monthlyEndDateAnalytics)
      .subscribe( data => {
          console.log(data)
          this.viewMonthlyTransactionsAnalytics(Object.assign({}, data));
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика за месяц', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика за месяц', 'Message: ' + error.message);
        });

    /**
     * DEV. Profile
     */
  }
  viewTransactionsAnalytics(analytics) {
    this.statusAmountAnalytics = [
      {
        'name': 'Успешно',
        'value': this.amountСonverter(analytics.statusAnalytics.successfulAmount)
      },
      {
        'name': 'Отказ',
        'value': this.amountСonverter(analytics.statusAnalytics.declinedAmount)
      }
    ];
    this.statusCountAnalytics = [
      {
        'name': 'Успешно',
        'value': analytics.statusAnalytics.successfulCount
      },
      {
        'name': 'Отказ',
        'value': analytics.statusAnalytics.declinedCount
      }
    ];

    //FIXME: moment  this.hourlyStartDateAnalytics = analytics.startDate;
    //FIXME: moment  this.hourlyEndDateAnalytics = analytics.endDate;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('successfulHourlyAnalytics = ' + JSON.stringify(analytics.successfulHourlyAnalytics))
    console.log('declinedHourlyAnalytics = ' + JSON.stringify(analytics.declinedHourlyAnalytics))
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

    this.hourlyAnalytics = [
      {'name': 'Успешно', 'series': this.pullHourlyAnalytics(analytics.successfulHourlyAnalytics)},
      {'name': 'Отказ', 'series': this.pullHourlyAnalytics(analytics.declinedHourlyAnalytics)}
    ];
    this.entryModeAnalytics = [
      {
        'name': 'Manual',
        'value': analytics.entryModeAnalytics.manualCount
      },
      {
        'name': 'NFC',
        'value': analytics.entryModeAnalytics.nfcCount
      },
      {
        'name': 'QR',
        'value': analytics.entryModeAnalytics.qrCount
      }];
    this.formFactorAnalytics = [
      {
        'name': 'Card',
        'value': analytics.formFactorAnalytics.cardCount
      },
      {
        'name': 'Phone',
        'value': analytics.formFactorAnalytics.phoneCount
      },
      {
        'name': 'Watch',
        'value': analytics.formFactorAnalytics.watchCount
      },
      {
        'name': 'Tablet',
        'value': analytics.formFactorAnalytics.tabletCount
      },
      {
        'name': 'Wearable',
        'value': analytics.formFactorAnalytics.wearableCount
      },
      {
        'name': 'Other',
        'value': analytics.formFactorAnalytics.otherCount
      }];
    this.declinedAnalytics = [
      {
        'name': 'Attestation',
        'value': analytics.declinedAnalytics.attestationDeclinedCount
      },
      {
        'name': 'Auth',
        'value': analytics.declinedAnalytics.authDeclinedCount
      },
      {
        'name': 'Technical',
        'value': analytics.declinedAnalytics.technicalDeclinedCount
      }];

    for (let i = 0; i < analytics.paymentSystemAnalytics.length; i++) {
      const paymentSystemAnalytic = analytics.paymentSystemAnalytics[i];
      if (paymentSystemAnalytic.paymentSystemName=='Visa') this.visa = paymentSystemAnalytic;
      if (paymentSystemAnalytic.paymentSystemName=='MasterCard') this.mastercard = paymentSystemAnalytic;
    }
    this.paymentSystemAnalytics = [
      {
        'name': 'Visa',
        'value': this.percentСonverter(this.visa.count + this.mastercard.count, this.visa.count)
      },
      {
        'name': 'MasterCard',
        'value': this.percentСonverter(this.visa.count + this.mastercard.count, this.mastercard.count)
      },
      {
        'name': '',
        'value': 100
      }
    ];
  }

  viewMonthlyTransactionsAnalytics(analytics) {
    this.monthlyStatusAmountAnalytics = [
      {
        'name': 'Успешно',
        'value': this.amountСonverter(analytics.statusAnalytics.successfulAmount)
      },
      {
        'name': 'Отказ',
        'value': this.amountСonverter(analytics.statusAnalytics.declinedAmount)
      }
    ];
    this.monthlyStatusCountAnalytics = [
      {
        'name': 'Успешно',
        'value': analytics.statusAnalytics.successfulCount
      },
      {
        'name': 'Отказ',
        'value': analytics.statusAnalytics.declinedCount
      }
    ];
    this.dailyAnalytics = [
    //   {'name': 'Успешно', 'series': this.pullHourlyAnalytics(analytics.successfulHourlyAnalytics)},
    //   {'name': 'Отказ', 'series': this.pullHourlyAnalytics(analytics.declinedHourlyAnalytics)}
    ];
    this.monthlyEntryModeAnalytics = [
      {
        'name': 'Manual',
        'value': analytics.entryModeAnalytics.manualCount
      },
      {
        'name': 'NFC',
        'value': analytics.entryModeAnalytics.nfcCount
      },
      {
        'name': 'QR',
        'value': analytics.entryModeAnalytics.qrCount
      }];
    this.monthlyFormFactorAnalytics = [
      {
        'name': 'Card',
        'value': analytics.formFactorAnalytics.cardCount
      },
      {
        'name': 'Phone',
        'value': analytics.formFactorAnalytics.phoneCount
      },
      {
        'name': 'Watch',
        'value': analytics.formFactorAnalytics.watchCount
      },
      {
        'name': 'Tablet',
        'value': analytics.formFactorAnalytics.tabletCount
      },
      {
        'name': 'Wearable',
        'value': analytics.formFactorAnalytics.wearableCount
      },
      {
        'name': 'Other',
        'value': analytics.formFactorAnalytics.otherCount
      }];
    this.monthlyDeclinedAnalytics = [
      {
        'name': 'Attestation',
        'value': analytics.declinedAnalytics.attestationDeclinedCount
      },
      {
        'name': 'Auth',
        'value': analytics.declinedAnalytics.authDeclinedCount
      },
      {
        'name': 'Technical',
        'value': analytics.declinedAnalytics.technicalDeclinedCount
      }];

    for (let i = 0; i < analytics.paymentSystemAnalytics.length; i++) {
      const paymentSystemAnalytic = analytics.paymentSystemAnalytics[i];
      if (paymentSystemAnalytic.paymentSystemName=='Visa') this.monthlyVisa = paymentSystemAnalytic;
      if (paymentSystemAnalytic.paymentSystemName=='MasterCard') this.monthlyMastercard = paymentSystemAnalytic;
    }
    this.monthlyPaymentSystemAnalytics = [
      {
        'name': 'Visa',
        'value': this.percentСonverter(this.monthlyVisa.count + this.monthlyMastercard.count, this.monthlyVisa.count)
      },
      {
        'name': 'MasterCard',
        'value': this.percentСonverter(this.monthlyVisa.count + this.monthlyMastercard.count, this.monthlyMastercard.count)
      },
      {
        'name': '',
        'value': 100
      }
    ];
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
    this.apiService.findDailyTransactionsAnalytics()
      .subscribe( data => {
          console.log(data)
          this.viewTransactionsAnalytics(Object.assign({}, data));
          this.showSuccess('Аналитика за текущий день', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика за текущий день', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика за текущий день', 'Message: ' + error.message);
        });

    this.apiService.findTransactionsAnalytics(this.monthlyStartDateAnalytics, this.monthlyEndDateAnalytics)
      .subscribe( data => {
          console.log(data)
          this.viewTransactionsAnalytics(Object.assign({}, data));
          this.showSuccess('Аналитика за месяц', 'Обновить');
        },
        error => {
          if (this.isNotEmpty(error.error.error)) this.showError('Аналитика за месяц', 'ErrorCode: ' + error.error.error.errorCode + '\n\rError: ' + error.error.error.errorText + '\r\nMessage: ' + error.error.error.message);
          else this.showError('Аналитика за месяц', 'Message: ' + error.message);
        });
  }

  private amountСonverter(cents): number {
    if (this.isNotEmpty(cents)) {
      const _cents = String(cents);
      const centsLength = _cents.length;
      if (2 < centsLength) {
        const amount = _cents.substr(0, centsLength - 2);
        return Number(amount);
      }
    }
    return 0;
  }

  private percentСonverter(allValue, value) {
    if (allValue==0 || value==0) return 0
    const percent = 100 * value / allValue
    return percent.toFixed(1)
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
