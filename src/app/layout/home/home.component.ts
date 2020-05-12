import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EmitType } from '@syncfusion/ej2-base';
import { ApiService } from '../../core/service/api.service';
import { Router } from '@angular/router';
import { multi } from './data';

class ItemFile {
  file: File;
  uploadProgress: string;
  responseStatus: string;
  isUploading: boolean;
}

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

  multi: any[];
  view: any[] = [1300, 300];
  // options
  showXAxis: boolean = false;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showDataLabel: boolean = true;
  legendPosition: string = "right";
  showXAxisLabel: boolean = true;
  yAxisLabel: string = "Grouped Horizontal Bar Chart";
  roundDomains: boolean = true;
  disableTooltip: boolean = true;
  showGridLines: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel = "Population";
  colorScheme = {domain: ['#148F77', '#943126', '#F1C40F']};
  schemeType: string = "ordinal";

  items: ItemFile[] = [];
  imageUrls: string[] = [];
  favourites: string[] = [];
  message: string = null;

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {
    Object.assign(this, { multi });
  }

  ngOnInit() {
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

  selectFiles = (event) => {
    this.items = [];
    let files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      // if (files.item(i).name.match(/\.(jpg|jpeg|png|gif)$/)) {
      this.items.push({file: files.item(i), uploadProgress: '0', responseStatus: '', isUploading: false});
      // }
    }
    this.message = `${this.items.length} valid image(s) selected`;
  }

  uploadFile(item: ItemFile) {
    const formData = new FormData();
    formData.append('image', item.file, item.file.name);
    return this.http.post('http://localhost:5000/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress ) item.uploadProgress = `${(event.loaded / event.total * 100)}%`;
      if (event.type === HttpEventType.Response) {
        let body: any = event.body;
        // let fileUrl: string = body.fileUrl
        // let fileName = fileUrl.replace( 'http://localhost:5000/files/uploads/', '')
        // fileName = fileName.substring(14, fileUrl.length)
        // console.log('Загрузка файла "' + fileName + '" успешно завершена!')
        console.log('Загрузка файла "' + item.file.name + '" успешно завершена!')
        let status: string = body.status
        item.responseStatus = status
        item.isUploading = true;
      }
    }, error => {
      // alert( JSON.stringify(error) );
      console.log('Ошибка загрузки файла: "' + item.file.name + '"?')
      item.responseStatus = 'ERR'
    });
  }

  cancelFile(item: ItemFile) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i]==item) {
        this.items[i].uploadProgress = '0'
        this.items[i].responseStatus = ''
      }
    }
  }

  /**
   * @see https://stackoverflow.com/questions/15453979/how-do-i-delete-an-item-or-object-from-an-array-using-ng-click
   */
  removeFile(item: ItemFile) {
    this.items.splice(this.items.indexOf(item),1);
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
