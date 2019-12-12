import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
// import { multi } from './data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  multi = [];
  view: any[] = [670, 150];

  // options
  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showDataLabel: boolean = true;
  legendPosition: string = 'right';
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Статус транзакций';
  roundDomains: boolean = true;
  disableTooltip: boolean = true;
  showGridLines: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel = 'Количество';
  colorScheme = {domain: ['#148F77', '#943126', '#F1C40F']};
  schemeType: string = 'ordinal';

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
          const statusAnalytics = data.dailyAnalytics.statusAnalytics;

          this.multi = [
            {
              'name': 'Amount',
              'series': [
                {
                  'name': 'successful',
                  'value': statusAnalytics.successfulAmount
                },
                {
                  'name': 'declined',
                  'value': statusAnalytics.declinedAmount
                }
              ]
            },
            {
              'name': 'Count',
              'series': [
                {
                  'name': 'successful',
                  'value': statusAnalytics.successfulCount
                },
                {
                  'name': 'declined',
                  'value': statusAnalytics.declinedCount
                }
              ]
            }];
        },
        error => {
          // alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
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
}
