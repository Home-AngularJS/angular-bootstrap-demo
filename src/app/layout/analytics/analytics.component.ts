import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  statusAnalytics = [];
  entryModeAnalytics = [];

  constructor(private router: Router, private apiService: ApiService, public dataService: DataService) { }

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

          console.log(this.statusAnalytics)
          console.log(this.entryModeAnalytics)
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  viewTransactionsAnalytics(analytics) {
    this.statusAnalytics = [
      {
        'name': 'Сумма',
        'series': [
          {
            'name': 'Успешно',
            'value': this.amountСonverter(analytics.statusAnalytics.successfulAmount)
          },
          {
            'name': 'Отказ',
            'value': this.amountСonverter(analytics.statusAnalytics.declinedAmount)
          }
        ]
      },
      {
        'name': 'Количество',
        'series': [
          {
            'name': 'Успешно',
            'value': analytics.statusAnalytics.successfulCount
          },
          {
            'name': 'Отказ',
            'value': analytics.statusAnalytics.declinedCount
          }
        ]
      }
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
  }

  onSelectChart(data): void {
    console.log("Item clicked", JSON.parse(JSON.stringify(data)));
  }

  onActivateChart(data): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onDeactivateChart(data): void {
    console.log("Deactivate", JSON.parse(JSON.stringify(data)));
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

  private isEmpty(val) {
    return (val === null || val === undefined || val === '') ? true : false;
  }

  private isNotEmpty(val) {
    return !this.isEmpty(val);
  }
}
