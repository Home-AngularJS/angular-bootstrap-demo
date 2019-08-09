import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { Router } from '@angular/router';
import { ApiService } from '../../core/service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mps',
  templateUrl: './mps.component.html',
  styleUrls: ['./mps.component.css']
})
export class MpsComponent implements OnInit {

  idMpsCards;
  editForm: FormGroup;
  selectedIdMpsCard;
  selectedIdMpsCardId;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, public dataService: DataService) { }

  ngOnInit() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.editForm = this.formBuilder.group({
      mpsId: [''],
      mpsName: [''],
      firsNumber: [''],
      symbol: ['']
    });

    /**
     * PROD. Profile
     */


    /**
     * DEV. Profile
     */
    this.idMpsCards = this.dataService.findAllMpsCards();
  }

  public createPanMasked() {
    const idMpsCard: any = {
      "mpsId": null,
      "mpsName": null,
      "firsNumber": 0,
      "symbol": null
    };
    console.log(idMpsCard)
    this.selectedIdMpsCard = idMpsCard;
    this.editForm.setValue(idMpsCard);
  }

  public selectIdMpsCard(idMpsCard) {
    console.log(idMpsCard);
    this.selectedIdMpsCard = idMpsCard;
    this.editForm.setValue(idMpsCard);
  }

  public selectIdMpsCardId(idMpsCard) {
    if (this.selectedIdMpsCardId === idMpsCard.mpsId) {
      this.selectIdMpsCard(idMpsCard);
    } else {
      this.selectedIdMpsCardId = idMpsCard.mpsId;
    }
  }

  public closeIdMpsCard() {
    this.selectedIdMpsCard = null;
  }

  public onSubmit() {
    const idMpsCard = this.editForm.value;


    if (idMpsCard.mpsId === null) {
      this.dataService.createMpsCard(idMpsCard);
      // this.pageRefresh(); // created successfully.
      this.closeIdMpsCard();
    } else {
      this.dataService.updateMpsCard(idMpsCard);
      // this.pageRefresh(); // updated successfully.
      this.closeIdMpsCard();
    }
  }

  public pageRefresh() {
    location.reload();
  }
}
