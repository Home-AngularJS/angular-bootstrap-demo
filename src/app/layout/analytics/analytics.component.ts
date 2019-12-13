import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  title = new Date();
  statusAmountAnalytics = [];
  statusCountAnalytics = [];
  entryModeAnalytics = [];
  formFactorAnalytics = [];
  hourlyAnalytics = [];
  hourlyStartDateAnalytics = new Date(0);
  hourlyEndDateAnalytics = new Date(0);
  declinedAnalytics = [];

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
          if (this.isNotEmpty(error.error)) this.showError('Аналитика', 'Error: ' + error.error.errorText + '; ErrorCode=' + error.error.errorCode + ';');
          else this.showError('Аналитика', error.message);
        });

    /**
     * DEV. Profile
     */
  }
  viewTransactionsAnalytics(analytics) {
    this.statusAmountAnalytics = [
      {
        'name': 'Успешно',
        'series': [
          {
            'name': 'успешно',
            'value': this.amountСonverter(analytics.statusAnalytics.successfulAmount),
            'extra': {
              'code': 'de'
            }
          }
        ]
      },
      {
        'name': 'Отказ',
        'series': [
          {
            'name': 'отказ',
            'value': this.amountСonverter(analytics.statusAnalytics.declinedAmount),
            'extra': {
              'code': 'de'
            }
          }
        ]
      }
    ];
    this.statusCountAnalytics = [
      {
        'name': 'Успешно',
        'series': [
          {
            'name': 'успешно',
            'value': analytics.statusAnalytics.successfulCount
          }
        ]
      },
      {
        'name': 'Отказ',
        'series': [
          {
            'name': 'отказ2',
            'value': analytics.statusAnalytics.declinedCount
          }
        ]
      }
    ];
    this.hourlyStartDateAnalytics = analytics.startDate;
    this.hourlyEndDateAnalytics = analytics.endDate;
    this.hourlyAnalytics = [
      {'name': 'Успешно', 'series': this.pullHourlyAnalytics(analytics.successfulHourlyAnalytics)},
      {'name': 'Отказ', 'series': this.pullHourlyAnalytics(analytics.declinedHourlyAnalytics)}
    ];
    this.entryModeAnalytics = [
      {
        'name': 'Entry-Mode',
        'value': analytics.entryModeAnalytics.manualCount
      },
      {
        'name': 'Pay-NFS',
        'value': analytics.entryModeAnalytics.nfcCount
      },
      {
        'name': 'Pay-QR',
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

    console.log(this.hourlyAnalytics)
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
