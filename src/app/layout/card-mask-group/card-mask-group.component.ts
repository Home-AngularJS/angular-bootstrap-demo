import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToCardMaskGroup, cardMaskGroupToDto, cardMaskGroupNew } from '../../core/model/card-mask-group.model';

@Component({
  selector: 'app-card-mask-group',
  templateUrl: './card-mask-group.component.html',
  styleUrls: ['./card-mask-group.component.css']
})
export class CardMaskGroupComponent implements OnInit {

  cardMaskGroups;
  editForm: FormGroup;
  selectedCardMaskGroup;
  selectedCardMaskGroupId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [''],
      beginMask: ['', Validators.required],
      endMask: ['', Validators.required],
      maskSymbol: ['', Validators.required]
    });

    /**
     * PROD. Profile
     */
    this.apiService.findAllCardMaskGroups()
      .subscribe( data => {
          console.log(data)
          const anyData: any = data
          const panMaskeds = anyData
          this.cardMaskGroups = panMaskeds.content;
          for (let i = 0; i < this.cardMaskGroups.length; i++) {
            const beginMask = this.cardMaskGroups[i].beginMask;
            const endMask = this.cardMaskGroups[i].endMask;
            const beginMaskSymbol = this.cardMaskGroups[i].maskSymbol.toString().substr(0, 1);
            const endMaskSymbol = this.cardMaskGroups[i].maskSymbol.toString().substr(1, 2);
            let preview: string = '';
            for (let b = 0; b < beginMask; b++) {
              preview += beginMaskSymbol;
            }
            for (let n = 0; n < (16 - beginMask - endMask); n++) {
              preview += 'N';
            }
            for (let e = 0; e < endMask; e++) {
              preview += endMaskSymbol;
            }

            this.cardMaskGroups[i].preview = preview;
          }
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
  }

  public createCardMaskGroup() {
    const entity: any = cardMaskGroupNew();
    console.log(entity)
    this.selectedCardMaskGroup = entity;
    this.editForm.setValue(entity);
  }

  public selectCardMaskGroup(cardMaskGroup) {
    console.log(cardMaskGroup);
    this.selectedCardMaskGroup = cardMaskGroup;
    const entity: any = dtoToCardMaskGroup(cardMaskGroup);
    this.editForm.setValue(entity);
  }

  public selectCardMaskGroupId(cardMaskGroup) {
    if (this.selectedCardMaskGroupId === cardMaskGroup.id) {
      this.selectCardMaskGroup(cardMaskGroup);
    } else {
      this.selectedCardMaskGroupId = cardMaskGroup.id;
    }
  }

  public closeCardMaskGroup() {
    this.selectedCardMaskGroup = null;
  }

  public onSubmit() {
    const dto = cardMaskGroupToDto(this.editForm.value);
    if (dto.id === null) {
      this.apiService.createCardMaskGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // created successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
    } else {
      this.apiService.updateCardMaskGroup(dto)
        .pipe(first())
        .subscribe(
          data => {
            this.pageRefresh(); // updated successfully.
          },
          error => {
            alert( JSON.stringify(error) );
          });
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
