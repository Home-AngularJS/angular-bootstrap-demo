import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { dtoToPanMasked, panMaskedGroupsToDto, panMaskedNew } from '../../core/model/pan-masked.model';

@Component({
  selector: 'app-pan-masked',
  templateUrl: './pan-masked.component.html',
  styleUrls: ['./pan-masked.component.css']
})
export class PanMaskedComponent implements OnInit {

  panMaskeds;
  editForm: FormGroup;
  selectedPanMasked;
  selectedPanMaskedId;

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
          this.panMaskeds = panMaskeds.content;
        },
        error => {
          alert( JSON.stringify(error) );
        });

    /**
     * DEV. Profile
     */
    // this.panMaskeds = this.dataService.getPanMaskeds();
  }

  public createPanMasked() {
    const entity: any = panMaskedNew();
    console.log(entity)
    this.selectedPanMasked = entity;
    this.editForm.setValue(entity);
  }

  public selectPanMasked(panMasked) {
    console.log(panMasked);
    this.selectedPanMasked = panMasked;
    const entity: any = dtoToPanMasked(panMasked);
    this.editForm.setValue(entity);
  }

  public selectPanMaskedId(panMasked) {
    if (this.selectedPanMaskedId === panMasked.id) {
      this.selectPanMasked(panMasked);
    } else {
      this.selectedPanMaskedId = panMasked.id;
    }
  }

  public closePanMasked() {
    this.selectedPanMasked = null;
  }

  public onSubmit() {
    const dto = panMaskedGroupsToDto(this.editForm.value);
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
