import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToBackgroundJobs, backgroundJobsToDto } from '../../core/model/background-job.model';

@Component({
  selector: 'app-background-job',
  templateUrl: './background-job.component.html',
  styleUrls: ['./background-job.component.css']
})
export class BackgroundJobComponent implements OnInit {
  backgroundJobs = [];
  takeChoices;

  constructor(private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    /**
     * DEV. Profile
     */
    this.takeChoices = this.dataService.getTakeChoices();

    /**
     * PROD. Profile
     */
    this.apiService.findAllBackgroundJobs()
      .subscribe( data => {
          console.log(data)
          for (let i = 0; i < data.content.length; i++) this.backgroundJobs.push(dtoToBackgroundJobs(data.content[i]));
        },
        error => {
          // alert( JSON.stringify(error) );
        });
  }

  private updateBackgroundJob(name: any, value: any, message) {
    this.apiService.updateBackgroundJob(name, value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSuccess('Сохранить', message); // updated successfully.
        },
        error => {
          this.showError('Сохранить', message);
        });
  }

  private backgroundJobsRefresh() {
    this.apiService.findAllBackgroundJobs()
      .subscribe( data => {
          console.log(data)
          this.backgroundJobs = [];
          for (let i = 0; i < data.content.length; i++) this.backgroundJobs.push(dtoToBackgroundJobs(data.content[i]));
          this.showSuccess('Обновить', 'Расписание');
        },
        error => {
          this.showError('Обновить', 'Расписание');
        });
  }

  public async onSubmitBackgroundJobs() {
    console.log(this.backgroundJobs);
    for (let i = 0; i < this.backgroundJobs.length; i++) {
      const entity = backgroundJobsToDto(this.backgroundJobs[i]);
      this.updateBackgroundJob(entity.name, entity, entity.name);
      await this.delay();
    }
    await this.delay();
    this.backgroundJobsRefresh();
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
    this.backgroundJobsRefresh();
  }
}
