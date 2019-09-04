import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // dropdownList = [];
  // selectedItems = [];
  // dropdownSettings = {};
  date1 = new Date();
  date2 = new Date();
  date3 = new Date();
  mytime1: Date = new Date();
  mytime2: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();

  @ViewChild('ejsModalDialog')
  ejsModalDialog: DialogComponent;
  header: string = 'SYNCFUSION';
  // showCloseIcon: Boolean = true;
  width: string = '25%';
  animationSettings: Object = { effect: 'None' };
  isModal: Boolean = false;
  target = '.control-section';
  ejsModalDialogButtons: Object[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    // this.dropdownList = [
    //   'Mumbai',
    //   'Bangaluru',
    //   'Pune',
    //   'Navsari',
    //   'New Delhi'
    // ];
    // this.selectedItems = [
    //   'Bangaluru',
    //   'Pune'
    // ];
    // this.dropdownSettings = {
    //   itemsShowLimit: 2,
    //   noDataAvailablePlaceholderText: 'нет данных'
    // };

    this.ejsModalDialogButtons = [{ click: this.cancelDialog.bind(this), buttonModel: { content: 'Cancel', isPrimary: false } }];
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onOpenDialog: EmitType<object> = () => {
    // document.getElementById('dlgBtn').style.display = 'none';
  }

  onCloseDialog: EmitType<object> = () => {
    // document.getElementById('dlgBtn').style.display = '';
  }

  openDialog: EmitType<object> = () => {
    document.getElementById('ejsModalDialog').style.display = 'block';
    this.isModal = true;
    this.ejsModalDialog.show();
  }

  cancelDialog: EmitType<object> = () => {
    this.ejsModalDialog.hide();
  }
}
