import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
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
  animationSettings: Object = { effect: 'Zoom' };
  isModal: Boolean = false;
  target = '.control-section';
  ejsModalDialogButtons: Object[];

  @ViewChild('ejsModalDialog2')
  ejsModalDialog2: DialogComponent;
  showCloseIcon2: Boolean = true;
  width2: string = '50%';
  isModal2: Boolean = false;
  target2: string = '.control-section2';
  animationSettings2: Object = { effect: 'None' };
  @ViewChild('successAlert') successAlert: ElementRef;
  @ViewChild('dangerAlert') dangerAlert: ElementRef;

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

  closeAlert() {
    setTimeout(() => {
      this.successAlert.nativeElement.classList.remove('show');
      this.dangerAlert.nativeElement.classList.remove('show');
    }, 3);
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

  onOpenDialog2: EmitType<object> = () => {
    (document.getElementById('sendButton') as any).keypress = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    (document.getElementById('inValue')as HTMLElement).onkeydown = (e: any) => {
      if (e.keyCode === 13) { this.updateTextValue(); }
    };
    document.getElementById('sendButton').onclick = (): void => {
      this.updateTextValue();
    };
  }

  onCloseDialog2: EmitType<object> = () => {
  }

  openDialog2: EmitType<object> = () => {
    document.getElementById('ejsModalDialog2').style.display = 'block';
    this.isModal2 = true;
    this.ejsModalDialog2.show();
  }

  private updateTextValue: EmitType<object> = () => {
    let enteredValue: HTMLInputElement = document.getElementById('inValue') as HTMLInputElement;
    let dialogTextElement: HTMLElement = document.getElementsByClassName('dialogText')[0] as HTMLElement;
    if (!isNullOrUndefined(document.getElementsByClassName('contentText')[0])) {
      detach(document.getElementsByClassName('contentText')[0]);
    }
    if (enteredValue.value !== '') {
      dialogTextElement.innerHTML = enteredValue.value;
    }
    enteredValue.value = '';
  }
}
