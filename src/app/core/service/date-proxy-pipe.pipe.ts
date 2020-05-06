import { DatePipe } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'dateTranslate' })
export class DateProxyPipe implements PipeTransform {

  constructor(@Inject(TranslateService) private translateService: TranslateService) {
    console.log(this.translateService.currentLang);
  }

  public transform(value: any, pattern: string = 'mediumDate', currentLang: any): any {
    const ngPipe = new DatePipe(currentLang);
    return ngPipe.transform(value, pattern);
  }
}
