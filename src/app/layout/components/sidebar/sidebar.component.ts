import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(@Inject(TranslateService) private translateService: TranslateService) { }

  ngOnInit() { }

  public getTranslate(item) {
    return (item).toUpperCase();
  }
}
